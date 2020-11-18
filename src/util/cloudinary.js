/*
 * hello
 * it's me
 * I was wondering if you would like to write utilities
 * to transform your
 * video streams
 * they say that I could just hand-code it
 * but that shit is weak
 *
 * HELLO FROM MY HELPER FIIIIIIIILES
 * THEY ADD A COUPLE THOUSAND LIIIIIIIIINES
 * TO “HELP” YOU
 * I’M SORRY
 * FOR WHAT I DID TO YOUR SITE
 * (DON’T TELL ADDY)
 * I CLEARLY HAD TO MEET A DEADLINE
 * (OF Q4)
 */

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'netlify',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/*
 * okay, let’s go on a little tour of how Cloudinary’s video editing works.
 * this will break down the anatomy of the URL and walk through each layer
 * and how it’s used:
 *
 * 1. we need the base URL
 *    https://res.cloudinary.com/netlify/video/upload
 *
 * 2. we need to set the sizing for the video we’re about to generate
 *    /w_1280,h_720,c_fill
 *
 * 3. the actual video goes here — NOT at the end — because transitions in
 *    Cloudinary are weird
 *
 *    we add this video (at the same size and crop settings) as a layer (`l_`)
 *    and finish with a transition, which is *another* video — a luma matte —
 *    that lets us do a cool switchover from the bumper to the actual video
 *
 *    the `fl_layer_apply` part tells Cloudinary that we’re done with settings
 *    for the current layer. note the double since there are two videos here
 *
 *    /l_video:explorers:Next-6-Dynamic-Routes,w_1280,h_720,c_fill/l_video:explorers:transition,e_transition/fl_layer_apply/fl_layer_apply
 *
 * 4. the outro bumper has some logic!
 *
 *    if this is the last video in a mission, we show the "complete" video to
 *    give the viewer a thumbs up (this would have been a high five, but in
 *    space that kind of altitude can cause vertigo). if there’s another video
 *    after this one, we show a countdown and auto-advance after it completes
 *
 *    /l_video:explorers:countdown,w_1280,h_720,c_fill/l_video:explorers:transition,e_transition/fl_layer_apply/fl_layer_apply
 *
 * 5. create a title card and splice it at the beginning of the video
 *
 *    for this, we’re taking the first 3 seconds (`eo_3`) of the intro video,
 *    splicing it (`fl_splice`) at the beginning of the generated video,
 *    resizing and cropping it, removing the audio ()`ac_none`), and slowing
 *    it down by 25% (`e_accelerate:-25`)
 *
 *    we then add a text overlay (`l_text`) and set the title in white
 *    (`co_white`)
 *
 *    by adding the `so_0` before applying the title card layer, we tell the
 *    splice to happen at the beginning instead of the end
 *
 *    /l_video:explorers:explorers-intro,fl_splice,w_1280,h_720,c_fill/eo_3,ac_none,e_accelerate:-25/l_text:Roboto_80:Dynamic%20Routes%20in%20Next.js,co_white/fl_layer_apply/so_0,fl_layer_apply
 *
 * 6. all of this is done on the bumper file
 *
 *    this is a little confusing, because effectively *every* video on the
 *    site is technically the bumper, but due to the way transitions work, we
 *    have to make this the base and build the other layers on top of it
 *
 *    /explorers/bumper.mp4
 *
 * easy peasy light and breezy lemon squeezy, right 🙃
 */
exports.getVideoUrls = async ({ title, publicId, isFinalStage }) => {
  /*
   * okay, let’s go on a little tour of how Cloudinary’s video editing works.
   * this will break down the anatomy of the URL and walk through each layer
   * and how it’s used:
   *
   * 1. video dimensions and global settings
   *
   *    by setting the quality to "auto", Cloudinary can reduce the size of the
   *    video without decreasing the visual quality
   *
   *    we want videos to play at 720p (1280x720), and setting crop to "fill"
   *    tells Cloudinary to fill available space (this is like
   *    `background-size: cover` in CSS)
   */
  const dimensions = {
    quality: 'auto',
    width: 1280,
    height: 720,
    crop: 'fill',
  };

  const transformationArray = [
    // set the dimensions for the final video
    dimensions,

    /*
     * 2. the actual video goes here — NOT at the end — because transitions in
     *    Cloudinary are weird
     *
     *    we add this video (at the same size and crop settings) as a layer and
     *    finish with a transition, which is *another* video — a luma matte —
     *    that lets us do a cool switchover from the bumper to the actual video
     *
     *    the `layer_apply` part tells Cloudinary that we’re done with settings
     *    for the current layer. note the double since there are two videos here
     */
    {
      overlay: `video:${publicId.replace('/', ':')}`,
      ...dimensions,
    },
    {
      overlay: 'video:explorers:transition',
      effect: 'transition',
    },
    { flags: 'layer_apply' }, // <= apply the transformation
    { flags: 'layer_apply' }, // <= apply the actual video

    /*
     * 3. the outro bumper has some logic!
     *
     *    if this is the last video in a mission, we show the "complete" video
     *    to give the viewer a thumbs up (this would have been a high five, but
     *    in space that kind of altitude can cause vertigo). if there’s another
     *    video after this one, we show a countdown and auto-advance after it
     *    completes
     */
    {
      overlay: `video:explorers:${isFinalStage ? 'complete' : 'countdown'}`,
      ...dimensions,
    },
    {
      overlay: 'video:explorers:transition',
      effect: 'transition',
    },
    { flags: 'layer_apply' }, // <= apply the transformation
    { flags: 'layer_apply' }, // <= apply the end bumper

    /*
     * 4. create a title card and splice it at the beginning of the video
     *
     *    for this, we’re taking the first 3 seconds (`end_offset`) of the intro
     *    video, splicing it (`flags: 'splice'`) at the beginning of the
     *    generated video, resizing and cropping it, removing the audio
     *    (`audio_code: 'none'`), and slowing it down by 25%
     *    (`effect: 'accelerate:-25'`)
     *
     *    we then add a text overlay and put the stage title over the top of the
     *    intro video excerpt
     *
     *    by adding the `start_offset: 0` when we apply the intro layer, we tell
     *    Cloudinary to splice this video at the beginning instead of the end,
     *    which is why it’s a title card and not an ending card, ya silly goose
     */
    {
      overlay: 'video:explorers:intro',
      flags: 'splice',
      ...dimensions,
    },
    {
      audio_codec: 'none',
      end_offset: 3,
      effect: 'accelerate:-25',
    },
    {
      overlay: {
        font_family: 'roboto',
        font_size: 80,
        text_align: 'center',
        text: title, // <= display the stage title on top of the video
        width: 1000,
        crop: 'fit',
      },
      color: 'white',
    },
    { flags: 'layer_apply' }, // <= apply the text overlay
    {
      flags: 'layer_apply', // <= apply the intro video
      start_offset: 0, // <= put this at the beginning of the video
    },
  ];

  /*
   * 5. start the transformations NEAOW!
   *
   */
  const result = await cloudinary.uploader.explicit('explorers/bumper', {
    type: 'upload',
    resource_type: 'video',
    eager: [
      [{ fetch_format: 'webm', video_codec: 'vp9' }, ...transformationArray],
      [{ fetch_format: 'mp4', video_codec: 'h265' }, ...transformationArray],
      [{ fetch_format: 'mp4', video_codec: 'h264' }, ...transformationArray],
      [{ fetch_format: 'auto' }, ...transformationArray],
    ],
    transformation: transformationArray,
    eager_async: true,
    // TODO update to prod
    eager_notification_url:
      'https://deploy-preview-363--explorers.netlify.app/.netlify/functions/cloudinary-eager-notification',
  });

  const formats = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    auto: '',
  };

  const codecs = {
    h265: '; codecs=hvc1',
    vp9: '; codecs=vp9',
    h264: '',
  };

  return result.eager.map((v) => {
    const url = v.secure_url;
    const format = formats[url.match(/f_(\w+)/)?.[1]] ?? 'video/mp4';
    const codec = codecs[url.match(/vc_(\w+)/)?.[1]] ?? '';
    const type = format + codec;

    return {
      type,
      url,
    };
  });
};
