import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import { useDropzone } from 'react-dropzone';
import Fieldset from 'part:@sanity/components/fieldsets/default';

export function Input({ value, onChange, type, level }) {
  const reader = new FileReader();

  reader.addEventListener('load', async function () {
    const dataURL = this.result;

    const asset = await fetch(
      'https://netlifyvideofunction.azurewebsites.net/api/upload-cloudinary-video',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-functions-key': process.env.SANITY_STUDIO_AZURE_FUNCTIONS_KEY,
        },
        body: JSON.stringify({
          video: dataURL,
        }),
      }
    ).then((response) => response.json());

    onChange(
      PatchEvent.from([
        set({
          _type: type.name,
          asset_id: asset.asset_id,
          public_id: asset.public_id,
          url: asset.secure_url,
        }),
      ])
    );
  });

  const removeVideo = React.useCallback(() => {
    onChange(PatchEvent.from([unset()]));
  });

  const onDropAccepted = React.useCallback((files) => {
    console.log(files);
    const [video] = files;
    reader.readAsDataURL(video);
  }, []);

  const onDropRejected = React.useCallback(() => {
    alert('Must be an MP4. Max upload size is 100MB!');
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: 'video/mp4',
    multiple: false,
    maxSize: 104857600,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Fieldset legend={type.title} description={type.description} level={level}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          {isDragActive ? (
            <>num num num videos!</>
          ) : (
            <button onClick={open}>upload a video, ya jabroni</button>
          )}
        </p>
      </div>
      {value?.url && (
        <div className="uploaded-video-content">
          <div className="video-ui">
            <button onClick={removeVideo}>Remove</button>
          </div>
          <video controls width="250">
            <source src={value.url} type="video/mp4" />
          </video>
        </div>
      )}
    </Fieldset>
  );
}
