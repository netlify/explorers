import { Input } from '../components/input';
import { Preview } from '../components/preview';

export default {
  name: 'cloudinary.video',
  type: 'object',
  title: 'Cloudinary Video',
  fields: [
    {
      type: 'string',
      name: 'asset_id',
    },
    {
      type: 'string',
      name: 'public_id',
    },
    {
      type: 'string',
      name: 'url',
    },
  ],
  inputComponent: Input,
  preview: {
    component: Preview,
  },
};
