import React, { useState, useEffect, useRef } from "react";
import uploadToS3, { deleteFileInS3 } from "../../hooks/S3";
import { requestBuilder, getAuthHeaders } from "../../hooks/useFetch";
import Loading from "../utils/Loading";
import { motion } from "framer-motion";

import {
  UploadIcon,
  PhotographIcon,
  ClipboardCopyIcon,
} from "@heroicons/react/solid";

function ImageSlideShow({
  table_name,
  record_id,
  showImageGallery,
  default_picture = -1,
}) {
  const [imageData, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkboxselected, setCheckbox] = useState([]);
  const fileRef = useRef();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    console.log(" table_name : " + table_name + " record_id : " + record_id);
    if (!table_name || !record_id) {
      console.log(" inside if");
      return;
    }
    console.log(" outside if");

    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    fetch(
      "https://shopfortyfive.herokuapp.com/api/image?table_name=" +
        table_name +
        "&record_id=" +
        record_id,
      request
    )
      .then((res) => res.json())
      .then((response) => {
        setImages(response);
        console.log(" response : " + JSON.stringify(response));
        setLoading(false);
      })
      .catch((err) => {
        console.log("error " + err);
        setLoading(false);
      });
  }, [record_id, reload]);

  const handleUpload = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    uploadToS3(file)
      .then((data) => {
        imageUrlUpload(data);
        console.log("successfully uploaded to amazon s3");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  function imageUrlUpload({ location, key }) {
    const reqBody = {
      table_name,
      record_id,
      url: location,
      name: key.split("/")[1],
    };
    setLoading(true);

    const request = requestBuilder(getAuthHeaders(), "POST", null, reqBody);
    fetch("https://shopfortyfive.herokuapp.com/api/image", request)
      .then((res) => res.json())
      .then((response) => {
        console.log(" successfully uploaded to Data base");
        setReload((prev) => !prev);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Failed to upload to data base" + err);
        setLoading(false);
      });
  }

  function onCheckedHandler(e, imgObj) {
    if (e.target.checked) {
      const copyimg = [...checkboxselected];
      copyimg.push(imgObj);
      setCheckbox(copyimg);
    } else {
      const copyimg = checkboxselected.filter((ig) => imgObj.id != ig.id);
      setCheckbox(copyimg);
    }
  }
  function imageUploadHandler() {
    fileRef.current.click();
  }

  function imageDeleteHandler() {
    checkboxselected.forEach((imgRecord) => {
      deleteFileInS3(imgRecord.name)
        .then((response) => {
          console.log(" response : " + JSON.stringify(response));
          if (response.status == "204") {
            console.log(" successfully deleted in Amazon s3");
            deleteInDb(imgRecord.id);
          } else {
            console.log(" unable to delete " + imgRecord.name + " in s3");
          }
        })
        .catch((err) => {
          deleteInDb(imgRecord.id);

          console.log(err);
        });
    });
  }

  function deleteInDb(imgId) {
    const request = requestBuilder(getAuthHeaders(), "DELETE", null, null);
    fetch("https://shopfortyfive.herokuapp.com/api/image?id=" + imgId, request)
      .then((res) => res.json())
      .then((response) => {
        console.log(" sucessfully deleted in db");
        setReload((prev) => !prev);
      })
      .catch((err) => console.log(err));
  }
  function setDefaultHandler() {
    if (checkboxselected.length > 1) {
      console.log(" plese select only one image");
    } else if (checkboxselected.length == 0) {
      console.log(" pleas select atlease one image to make it default");
    } else {
      const url = checkboxselected[0].url;
      setLoading(true);
      const request = requestBuilder(getAuthHeaders(), "PUT", null, {
        picture: url,
      });
      fetch(
        "https://shopfortyfive.herokuapp.com/api/" +
          table_name +
          "?id=" +
          record_id,
        request
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(" sucessfully update image url  in db");
          setReload((prev) => !prev);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }

  function setCampaignHandler() {
    checkboxselected.forEach((imgObj) => {
      const reqBody = {
        table_name,
        record_id,
        url: imgObj.url,
      };
      setLoading(true);
      const request = requestBuilder(getAuthHeaders(), "POST", null, reqBody);
      fetch("https://shopfortyfive.herokuapp.com/api/campaigns", request)
        .then((response) => response.json())
        .then((res) => {
          setLoading(false);
          console.log("crated a campaign for " + imgObj.url);
        })
        .catch((err) => console.log(err));
    });
  }

  return (
    <div className="border-t">
      <div className="flex bg-slate-50 justify-between p-3 items-center">
        <div className="text-gray-600 flex items-center justify-center gap-2 capitalize font-semibold text-xl">
          <PhotographIcon className="w-5 h-5" />
          <h1>Images</h1>
        </div>
        <div className="flex gap-2 items-center ">
          <input
            ref={fileRef}
            onChange={handleUpload}
            type="file"
            className="hidden"
          />

          {!showImageGallery.canCampaign ? (
            <button
              onClick={setCampaignHandler}
              className="px-3 py-2 gap-2 tracking-widest rounded-sm flex items-center justify-center font-light ring-1  ring-primary hover:text-white active:text-orange hover:bg-blue-600 active:bg-blue-700 text-primary"
            >
              <PhotographIcon className="w-5 h-5" />
              <h3>Create Campaign</h3>
            </button>
          ) : (
            ""
          )}

          <button
            onClick={setDefaultHandler}
            className="p-2 flex items-center justify-center  gap-2 bg-primary text-white rounded-sm tracking-widest
            hover:bg-blue-600 active:bg-blue-700 shadow-sm shadow-primary
            "
          >
            <ClipboardCopyIcon className="w-5 h-5" />
            <h3> Apply to {showImageGallery.title}</h3>
          </button>
          <button
            onClick={imageUploadHandler}
            className="p-2 bg-green-500 flex items-center justify-center hover:bg-green-600 active:bg-green-700 shadow-sm shadow-green-500 rounded-sm tracking-widest"
          >
            <UploadIcon className="w-5 h-5" />
            <h1> Upload Image</h1>
          </button>
          <button
            onClick={imageDeleteHandler}
            className="p-2 ring-1 ring-red-500 rounded-sm hover:bg-red-500 active:bg-red-600 tracking-widest"
          >
            Delete Image
          </button>
        </div>
      </div>
      <div className=" justify-start p-5 flex flex-wrap gap-2 mt-2">
        {imageData && imageData.length == 0 ? (
          <div className="w-full flex justify-center justify-center">
            <img src="/image_empty.svg" className="w-96" />
          </div>
        ) : (
          imageData.map((imgRecord, index) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                key={index}
                className="w-56 aspect-square shadow-sm rounded-md group relative shadow-black m-2 "
              >
                {imgRecord.url == default_picture ? (
                  <p className="bg-primary px-2 py-1 text-white text-center tracking-widest">
                    Default {showImageGallery.title} image{" "}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="checkbox"
                  onClick={(e) => onCheckedHandler(e, imgRecord)}
                  className="absolute  border-2 checked:block group-hover:block  block  h-5 w-5 -top-2 -left-2"
                />
                <img
                  src={imgRecord.url}
                  className="w-full h-full aspect-video object-cover"
                />
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ImageSlideShow;
