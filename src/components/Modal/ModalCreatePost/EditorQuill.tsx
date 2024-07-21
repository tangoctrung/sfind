import React, { Component } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const Quill = dynamic(() => import('react-quill'), { ssr: false });

// #2 register module
// Quill.register("modules/imageUploader", ImageUploader);
type MyProps = {
    data: string,
    onChangeData: any;
};

type MyState = {
    text: ""
};

class EditorQuill extends Component<MyProps, MyState> {
    state: MyState = {
        text: "",
    }
    modules = {
        // #3 Add "image" to the toolbar
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            ["link"],
            ["image", "video"], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

            [{ align: [] }],
        ],
        // # 4 Add module and upload function
        imageUploader: {
            upload: (file: File) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("upload", file);
                    // upload anh len server o day
                });
            }
        }
    };

    formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "imageBlot" // #5 Optinal if using custom formats
    ];

    render() {
        return (
            <ReactQuill
                theme="snow"
                modules={this.modules}
                formats={this.formats}
                value={this.props.data}
                onChange={(value) => this.props.onChangeData(value)}
                className="w-full scrollbar-none"
            />
        );
    }
}

export default EditorQuill;