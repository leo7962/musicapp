import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Icon, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";
import { toast, ToastType } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./AddSongForm.scss";

const db = firebase.firestore(firebase);

export default function AddSongForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialValueForm());
  const [albums, setAlbums] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.collection("albums")
      .get()
      .then(response => {
        const albumsArray = [];
        map(response?.docs, album => {
          const data = album.data();
          albumsArray.push({
            key: album.id,
            value: album.id,
            text: data.name
          });
        });
        setAlbums(albumsArray);
      });
  }, []);

  const onDrop = useCallback(acceptedFiels => {
    const file = acceptedFiels[0];
    setFile(file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".mp3",
    noKeyboard: true,
    onDrop
  });

  const uploadSong = fileName => {
    const ref = firebase
      .storage()
      .ref()
      .child(`song/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = () => {
    if (!formData.name || !formData.album) {
      toast.warning(
        "The name of the song and the album it belongs to are required."
      );
    } else if (!file) {
      toast.warning("The song is mandatory");
    } else {
      setIsLoading(true);
      const fileName = uuidv4();
      uploadSong(fileName)
        .then(() => {
          db.collection("songs")
            .add({
              name: formData.name,
              album: formData.album,
              fileName: fileName
            })
            .then(() => {
              toast.success("Song uploaded successfully.");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              toast.error("Error uploading song.");
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast.error("Song upload error.");
          setIsLoading(false);
        });
    }
  };

  const resetForm = () => {
    setFormData(initialValueForm());
    setFile(null);
    setAlbums([]);
  };

  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Name of the song"
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="Name of the album"
          search
          selection
          lazyLoad
          options={albums}
          onChange={(e, data) =>
            setFormData({ ...formData, album: data.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <div className="song-upload" {...getRootProps()}>
          <input {...getInputProps()} />
          <Icon name="cloud upload" className={file && "load"} />
          <div>
            <p>
              Drag your song or click <span>here</span>.
            </p>
            {file && (
              <p>
                Canción subida: <span>{file.name}</span>
              </p>
            )}
          </div>
        </div>
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Upload song
      </Button>
    </Form>
  );
}

function initialValueForm() {
  return {
    name: "",
    album: ""
  };
}
