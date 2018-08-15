export const ViewConstants = {
  HEADER_HEIGHT: 35,
  SIDEBAR_WIDTH: 300,
  CONSOLE_CONTROLS: 30,
  CONSOLE_WIDTH: 500
};

export const DEFAULT_CODE = `(Model, Curves, Complex, Parser, Formula, params) => {
      let model = new Model(params);
      model.addCurve(
        new Curves.Circle([
          { label: "x0", value: new Complex(0, 0) },
          { label: "y0", value: new Complex(0, 0) },
          { label: "r",  value: new Complex(1, 0) }
        ])
      );
      return model;
    }`;

export const Action = {
  VIEW_WRAPPER_CHANGED: 1,
  BUILD_CODE: 2,
  CLEAR_MODEL: 3,
  CHANGE_MATRIX_PROPS: 4,
  PROJECTION_CONFIG_UPDATE: 5,
}