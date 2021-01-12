import { Input } from '../components/input';
// import { Preview } from '../components/preview';

export default {
  name: 'cloudinary.video',
  type: 'object',
  title: 'Cloudinary Video',
  description:
    'Get the public ID, and full secure URL from Cloudinary after you upload at https://url.netlify.com/S1dhTGotD',
  fields: [
    {
      type: 'string',
      name: 'public_id',
      description:
        'This will always start with "explorers/" — it’s the last part of the URL without the .mp4',
    },
    {
      type: 'string',
      name: 'url',
      description: 'Click the link icon on your video to copy this.',
    },
    {
      type: "string",
      name: "captions",
      description: "Export from Descript by going to file>export click subtitles and make sure the format is VTT (Video Text Titles)"
    }
  ],
  // inputComponent: Input,
  // preview: {
  //   component: Preview,
  // },
};
