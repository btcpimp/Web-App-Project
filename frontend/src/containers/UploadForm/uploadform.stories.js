import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import UploadForm from "./UploadForm"
storiesOf("Containers/Upload Form")
  .add("Upload Form - empty", () => {
    var { store, story } = createStoreAndStory({
      component: UploadForm,
    })
    return story
  })
  .add("Upload Form - loading", () => {
    var { store, story } = createStoreAndStory({
      component: UploadForm,
    })
    return story
  })

  .add("Upload Form - error", () => {
    var { store, story } = createStoreAndStory({
      component: UploadForm,
    })
    return story
  })
