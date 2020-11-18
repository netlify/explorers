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
   *    the explicit command tells Cloudinary to immediately apply these
   *    transformations instead of waiting for someone to load the URLs. this
   *    needs to happen because otherwise videos will break in some browsers
   *    (e.g. iOS Safari) if someone tries to watch them before they’ve finished
   *    encoding
   *
   *    we’re targeting several formats that should work on all browsers,
   *    ordered from smallest file size to largest
   */
  const result = await cloudinary.uploader.explicit('explorers/bumper', {
    type: 'upload',
    resource_type: 'video',
    eager: [
      [{ fetch_format: 'mp4', video_codec: 'h265' }, ...transformationArray],
      [{ fetch_format: 'webm', video_codec: 'vp9' }, ...transformationArray],
      [{ fetch_format: 'mp4', video_codec: 'h264' }, ...transformationArray],
      [{ fetch_format: 'auto' }, ...transformationArray],
    ],
    transformation: transformationArray,
    eager_async: true,
    eager_notification_url:
      'https://explorers.netlify.com/.netlify/functions/cloudinary-eager-notification',
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
