'use client'
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const FileUploading = () => {

    const [preview, setPreview] = useState('');

    const upload = (e) => {

        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'picsaresus')
        fd.append('cloud_name', 'dqawt61bj')

        axios.post('https://api.cloudinary.com/v1_1/dqawt61bj/image/upload', fd)
            .then((result) => {
                toast.success('file upload successfully');
                console.log(result.data);
                setPreview(result.data.url);
                // productForm.setFieldValue('image', result.data.url);
            }).catch((err) => {
                console.log(err);
                toast.error('failed to upload file');

            });
    }
    return (
        <div className='flex justify-center items-center h-[90vh]'>
            <label className='block rounded-lg text-2xl border-2 border-dashed p-5 mt-5 cursor-pointer w-1/2 text-blue-500' htmlFor="upload">click here to upload file</label>
            <input id='upload' type="file" onChange={upload} hidden />
            {
                preview && (
                    <img className='h-150' src={preview} alt="" />
                )
            }
        </div>
    )
}

export default FileUploading;