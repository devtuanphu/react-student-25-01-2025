import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { addProduct } from "../../services/product";
const AddProduct = () => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState([]);
  const API_KEY_TINY = import.meta.env.VITE_API_KEY_TINY;

  const onFinish = async (values) => {
    const priceAsNumber = parseFloat(values.price);

    try {
      const dataToSubmit = {
        ...values,
        detail: editorContent,
        price: priceAsNumber,
        images,
      };

      console.log(
        "Data ready to be submitted:",
        JSON.stringify(dataToSubmit, null, 2)
      );
      await addProduct(dataToSubmit);
      alert("Product added successfully!");
    } catch (error) {
      alert("Failed to add product!");
      console.error(error);
    }
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const promises = Array.from(files).map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "forever");

      return fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Upload failed");
          return response.json();
        })
        .then((data) => data.secure_url)
        .catch((error) => {
          console.error("Error uploading file:", error);
          return null; // Return null or handle error appropriately
        });
    });

    const results = await Promise.all(promises);
    const newImages = results.filter((url) => url != null); // Filter out any nulls from errors
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please input the name of the product!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[
          { required: true, message: "Please input the price of the product!" },
        ]}
      >
        <Input type="number" prefix="$" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Detail"
        rules={[
          { required: true, message: "Please input the product details!" },
        ]}
      >
        <Editor
          apiKey={API_KEY_TINY}
          onEditorChange={handleEditorChange}
          initialValue="Welcome to TinyMCE!"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
          }}
        />
      </Form.Item>

      <Form.Item
        name="images"
        label="Upload Images"
        extra="Select multiple images"
      >
        <input type="file" multiple onChange={handleFileChange} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
