# Getting Started with Dicom Image Slides Viewer

Live at [Dicom Slides Viewer](https://dicom-image-slides.vercel.app/).

## Features

    1. Create certain number of slides (current limitation is 5)
    2. Add certain number of images to each slide (current limitation is 5 and minimum 2 images)
    3. View each slide (to navigate there are left and right arrows in the slider(visible on hovering on left and right side))
    4. Navigate to each image in a slide
    4. Add further images to each slide
    5. Remove current slide
    6. Download pptx of each slide(todo: need to convert dicom images to png/jpg to work with powerpoint)

    Added:
        1.Images are now sent to server and accessed using server URL(suited for doing .dcm to png/jpg conversion at server side)

### `Limitations`

    * Please add DICOM images (.dcm)to slide from your local storage(device)
    * Random app crashes while scrolling down each image on a slide (advised to wait 10-15 sec before scrolling on a slide)
    * Because of .dcm extension the DICOM images are not visible in pptx file
    *

### Dependencies

    1. "react-cornerstone-viewport" for viewing the images
    2. "react-responsive-carousel" for creating slide carousel
    3. "pptxgenjs" for creating and downloading pptx from slide images

## Available Scripts for running locally:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
