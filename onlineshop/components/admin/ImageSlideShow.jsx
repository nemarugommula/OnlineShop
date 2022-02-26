import React, { useState, useEffect, useRef } from "react";
import uploadToS3, { deleteFileInS3 } from "../../hooks/S3";
import { requestBuilder, getAuthHeaders } from "../../hooks/useFetch";
import Loading from "../utils/Loading";
import { motion } from "framer-motion";

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
      "http://localhost:5000/api/image?table_name=" +
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
    const request = requestBuilder(getAuthHeaders(), "POST", null, reqBody);
    fetch("http://localhost:5000/api/image", request)
      .then((res) => res.json())
      .then((response) => {
        console.log(" successfully uploaded to Data base");
        setReload((prev) => !prev);
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
    fetch("http://localhost:5000/api/image?id=" + imgId, request)
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
      const request = requestBuilder(getAuthHeaders(), "PUT", null, {
        picture: url,
      });
      fetch(
        "http://localhost:5000/api/" + table_name + "?id=" + record_id,
        request
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(" sucessfully update image url  in db");
          setReload((prev) => !prev);
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
      const request = requestBuilder(getAuthHeaders(), "POST", null, reqBody);
      fetch("http://localhost:5000/api/campaigns", request)
        .then((response) => response.json())
        .then((res) => {
          console.log("crated a campaign for " + imgObj.url);
        })
        .catch((err) => console.log(err));
    });
  }

  return (
    <div className="border">
      <div className="flex bg-slate-50 justify-between p-2 items-center">
        <h1 className="text-xl font-light">Product Images</h1>

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
              className="px-3 py-2 tracking-widest font-light ring-1  ring-primary hover:text-white active:text-orange hover:bg-blue-600 active:bg-blue-700 text-primary"
            >
              Make this as a campaign
            </button>
          ) : (
            ""
          )}

          <button
            onClick={setDefaultHandler}
            className="p-2 bg-primary text-white rounded-sm tracking-widest
            hover:bg-blue-500 active:bg-blue-600 shadow-sm shadow-primary
            "
          >
            Make this image default to {showImageGallery.title}
          </button>
          <button
            onClick={imageUploadHandler}
            className="p-2 bg-green-500 hover:bg-green-600 active:bg-green-700 shadow-sm shadow-green-500 rounded-sm tracking-widest"
          >
            Upload Image
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
        {loading ? (
          <Loading />
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
