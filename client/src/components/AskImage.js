import React, { Component } from "react";
import axios from "axios";
import "../css/askImage.css";
import { connect } from "react-redux";
class AskImage extends Component {
  state = {
    previewImages: [],
    questionTitle: "",
    validationError: false,
    error: []
  };
  handleFiles = event => {
    let files = event.target.files,
      imgUrls = [],
      { previewImages } = this.state,
      lastImgId,
      lastImgObject = previewImages.slice(-1).pop(),
      acceptedType = ["image/png", "image/jpeg", "image/jpg"],
      bigError = [],
      isErrorOcurred = false;
    // finding the last image id so when adding  new image we  can
    // use continue image id;
    if (!lastImgObject) {
      lastImgId = 0;
    } else {
      lastImgId = lastImgObject.id;
    }
    if (files && files[0]) {
      // converting the fileList object into array for looping
      Array.from(files).forEach(file => {
        // check if the file size is larger than 1mb
        if (file.size < 1024 * 1024) {
          // checking the file type
          if (acceptedType.indexOf(file.type) !== -1) {
            imgUrls.push({
              id: lastImgId + 1,
              imgName: file.name,
              url: URL.createObjectURL(file), // creating a object url for dispalying thumbnail image
              file
            });
            lastImgId++;
          } else {
            // Invalid file type error;
            bigError.push("Invalid file type!");
            isErrorOcurred = true;
          }
        } else {
          // setting the state for file too large error
          bigError.push("File is too large!");
          isErrorOcurred = true;
        }
      });
      // setting the previewimages;
      // setting the previewimages;
      this.setState({
        error: bigError,
        validationError: isErrorOcurred,
        previewImages: [...previewImages, ...imgUrls]
      });
      // calling the handleFormSubmit function;
      if (isErrorOcurred) {
        setTimeout(() => {
          this.setState({ validationError: false, error: [] });
        }, 2000);
      }
      // delete the element files
      event.target.value = null;
    }
  };
  // handle onchange input text
  handleOnChange = eve => {
    this.setState({ questionTitle: eve.target.value });
  };
  /*
   *Deleting image
   */
  handleImgDelete = eve => {
    let { previewImages } = this.state,
      id = Number(eve.target.id);
    previewImages = previewImages.filter(el => el.id !== id);
    this.setState({ previewImages });
  };
  /*
   *  handling form submit
   */

  handleFormSubmit = () => {
    let formData = new FormData(),
      { previewImages } = this.state;
    // set the title in formdata
    formData.append("questionTitle", this.state.questionTitle);
    previewImages.forEach(el => {
      formData.append("file[]", el.file);
    });

    let token = "bearer " + this.props.token;
    // sending the form data to the server;
    axios({
      url: "http://localhost:5000/api/new-question",
      method: "POST",
      data: formData,
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      console.log(res.data);
    });
  };

  /*
   * validate user inputs
   */
  validateForm = (eve, clbk) => {
    // preventing default behaviour of form submit
    eve.preventDefault();
    let { previewImages, questionTitle } = this.state,
      acceptedType = ["image/png", "image/jpeg", "image/jpg"], // type of images accepted
      bigError = [], // array of errors
      isErrorOcurred = false, // for checking whether error occured
      sizeLimit = 1024 * 1024; // size limit of a file
    if (!questionTitle || questionTitle.length < 10) {
      bigError.push("Please provide title!");
      isErrorOcurred = true;
    }
    if (!previewImages.length) {
      bigError.push("Please provide atleast one image!");
      isErrorOcurred = true;
    }
    previewImages.forEach(indFile => {
      // check if the file size is larger than 1mb
      if (indFile.file.size < sizeLimit) {
        // checking the file type
        if (acceptedType.indexOf(indFile.file.type) === -1) {
          bigError.push("Invalid file type!");
          isErrorOcurred = true;
        }
      } else {
        bigError.push("File is too large!");
        isErrorOcurred = true;
      }
    });
    this.setState({ error: bigError, validationError: isErrorOcurred });
    // calling the handleFormSubmit function;
    if (!isErrorOcurred) {
      clbk();
    } else {
      setTimeout(() => {
        this.setState({ validationError: false, error: [] });
      }, 2000);
    }
  };
  // get the error content
  errorNotifier = () => {
    let { validationError, error } = this.state;
    if (validationError) {
      return error.map((element, id) => (
        <p className="error-content" key={id}>
          {element}
        </p>
      ));
    } else {
      return "";
    }
  };
  render() {
    return (
      <div className="question-overlay">
        <div className="question-modal">
          <form
            className="question-form"
            encType="multipart/form-data"
            onSubmit={eve => {
              this.validateForm(eve, this.handleFormSubmit);
            }}
          >
            <h3 className="question-modal-title">Post your doubts on images</h3>
            <div className="error-wrapper">{this.errorNotifier()}</div>
            <div className="input-wrapper">
              <div className="upload-btn-wrapper">
                <button className="btn">Upload Image</button>
                <input
                  type="file"
                  name="myfile"
                  multiple
                  onChange={this.handleFiles}
                  accept="image/jpeg , image/png"
                />
              </div>
            </div>
            <div className="image-container">
              {/* looping through the preview images */}
              {this.state.previewImages.map(el => (
                <div className="image-holder" key={el.id}>
                  <span
                    id={el.id}
                    className="del-uploaded-img"
                    onClick={this.handleImgDelete.bind(el.id)}
                  >
                    &times;
                  </span>
                  <img src={el.url} alt="" className="input-image" />
                  <span className="img-name">{el.imgName}</span>
                </div>
              ))}
            </div>
            <div className="post-title-wrapper">
              <input
                onChange={this.handleOnChange}
                type="text"
                className="title-input"
                placeholder="Add a small hint about the image.."
              />
            </div>
            <button className="submit-post btn-blue-white" type="submit">
              Add question
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.user.token
  };
};
export default connect(
  mapStateToProps,
  null
)(AskImage);
