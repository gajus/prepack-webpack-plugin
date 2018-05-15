// @flow

export type PrepackConfigType = Object;

export type PluginConfigType = {
  prepack: PrepackConfigType,
  test: RegExp
};

export type UserPluginConfigType = {
  prepack?: PrepackConfigType,
  test?: RegExp
};
