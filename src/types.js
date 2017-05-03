// @flow

export type PrepackConfigurationType = Object;

export type PluginConfigurationType = {
  prepack: PrepackConfigurationType,
  test: RegExp
};

export type UserPluginConfigurationType = {
  prepack?: PrepackConfigurationType,
  test?: RegExp
};
