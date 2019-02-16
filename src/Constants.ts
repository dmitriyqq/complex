export const ViewConstants = {
  CONSOLE_CONTROLS: 30,
  CONSOLE_WIDTH: 500,
  HEADER_HEIGHT: 35,
  SIDEBAR_WIDTH: 300,
};

export const DEFAULT_CODE =
 `/**********************************************************
  * THIS IS CODE SAMPLE. YOU COULD TRY YOU OWN            *
  * CURVES OR LOAD SOME FROM GALLERY                      *
  *********************************************************/
  (Model, Curves, Complex, Parser, Formula, params) => {
      const model = new Model();
      model.addCurve(
            new Curves.Circle([
              { label: "x0", value: new Complex(0, 0) },
              { label: "y0", value: new Complex(0, 0) },
              { label: "r",  value: new Complex(1, 0) }
            ])
          );
      return { model };
    }
`;

export const CODE_HEADER =
  `function(Curves, Complex, Parser, Formula, params, model) {
     model.clear()
  `

export const CODE_FOOTER = `
 }
`


export const Action = {
  ADD_SKETCH: "add_story",
  BUILD_CODE: "build_code",
  CHANGE_MATRIX_PROPS: "change_matrix_props",
  CLEAR_CODE: "clear_code",
  CLEAR_MODEL: "clear_model",
  LOAD_SKETCH: "load_story",
  PROJECTION_CONFIG_UPDATE: "projection_config_update",
  REMOVE_SKETCH: "remove_story",
  TOGGLE_GALLERY: "toggle_gallery",
  UPDATE_CAMERA: "update_camera",
  UPDATE_EDITOR: "update_editor",
  UPDATE_IMAGE: "update_image",
  VIEW_WRAPPER_CHANGED: "view_wrapper_changed",
}