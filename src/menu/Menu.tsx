import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import {
  Affine,
  Extend,
  Extract,
  Flip,
  Flop,
  Resize,
  Rotate, 
  Sharpen, 
  Trim, 
  Median, 
  Blur, 
  Flatten, 
  Unflatten, 
  Gamma, 
  Negate, 
  Normalise, 
  Clahe, 
  Convolve, 
  Threshold,
  Linear,
  Recomb,
  Modulate,
  Tint,
  Grayscale,
  PipelineColorspace,
  ToColorspace,
  RemoveAlpha,
  EnsureAlpha,
  ExtractChannel,
  Bandbool,
  Text,
  Create
} from ".";
import "./Menu.css";

type MenuProps = {
  appendParam: (param: string, value: string | Array<string>) => void;
  removeParam: (param: Array<string>) => void;
  values: ParsedUrlQuery
};

export function Menu({ appendParam, removeParam, values }: MenuProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({
    rotate: false,
    rotateAfter: false,
    flip: false,
    flop: false,
    affine: false,
    sharpen: false,
    median: false,
    blur: false,
    flatten: false,
    unflatten: false,
    gamma: false,
    negate: false,
    normalise: false,
    clahe: false,
    threshold: false,
    convolve: false,
    linear: false,
    recomb: false,
    modulate: false,
    tint: false,
    grayscale: false,
    pipelineColorSpace: false,
    toColorspace: false,
    bandbool: false,
    extractChannel: false,
    removeAlpha: false,
    ensureAlpha: false,
    resize: false,
    extend: false,
    extract: false,
    extractAfter: false,
    trim: false,
    text: false,
    create: false,
  });
  const [applied, setApplied] = useState<Record<string, boolean>>({
    rotate: false,
    "rotate.background": false,
    rotateAfter: false,
    "rotateAfter.background": false,
    flip: false,
    flop: false,
    affine: false,
    "affine.background": false,
    "affine.idx": false,
    "affine.idy": false,
    "affine.odx": false,
    "affine.ody": false,
    "affine.interpolator": false,
    sharpen: false,
    "sharpen.sigma": false,
    "sharpen.m1": false,
    "sharpen.m2": false,
    "sharpen.x1": false,
    "sharpen.y2": false,
    "sharpen.y3": false,
    median: false,
    blur: false,
    flatten: false,
    "flatten.background": false,
    unflatten: false,
    gamma: false,
    negate: false,
    "negate.alpha": false,
    normalise: false,
    "normalise.upper": false,
    "normalise.lower": false,
    "clahe.width": false,
    "clahe.height": false,
    "clahe.maxSlope": false,
    "convolve.width": false,
    "convolve.height": false,
    "convolve.maxSlope": false,
    threshold: false,
    "threshold.grayscale": false,
    "linear.a": false,
    "linear.b": false,
    "recomb.0": false,
    "recomb.1": false,
    "recomb.2": false,
    "modulate.saturation": false,
    "modulate.brightness": false,
    "modulate.hue": false,
    "modulate.lightness": false,
    tint: false,
    grayscale: false,
    pipelineColorSpace: false,
    toColorspace: false,
    bandbool: false,
    extractChannel: false,
    removeAlpha: false,
    ensureAlpha: false,
    "resize.width": false,
    "resize.height": false,
    "resize.fit": false,
    "resize.position": false,
    "resize.background": false,
    "resize.kernel": false,
    "resize.withoutEnlargement": false,
    "resize.withoutReduction": false,
    "resize.fastShrinkOnLoad": false,
    extend: false,
    "extend.top": false,
    "extend.left": false,
    "extend.bottom": false,
    "extend.right": false,
    "extend.extendWith": false,
    "extend.background": false,
    "extract.top": false,
    "extract.left": false,
    "extract.width": false,
    "extract.height": false,
    "extractAfter.top": false,
    "extractAfter.left": false,
    "extractAfter.width": false,
    "extractAfter.height": false,
    "trim.background": false,
    "trim.threshold": false,
    "trim.lineArt": false,
    "text.text": false,
    "text.font": false,
    "text.fontfile": false,
    "text.width": false,
    "text.height": false,
    "text.align": false,
    "text.justify": false,
    "text.dpi": false,
    "text.spacing": false,
    "text.rgba": false,
    "text.wrap": false,
    "create.width": false,
    "create.height": false,
    "create.channels": false,
    "create.noise.mean": false,
    "create.noise.sigma": false,
    "create.noise.type": false,
    "create.background": false,
  });

  return (
    <nav>
      <Resize open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Extend open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Extract open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Extract after open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Trim open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Rotate open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Rotate after open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Flip open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Flop open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Affine open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Sharpen open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Median open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Blur open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Flatten open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Unflatten open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Gamma open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Negate open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Normalise open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Clahe open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Convolve open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Threshold open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Linear open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Recomb open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Modulate open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Tint open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Grayscale open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <PipelineColorspace open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <ToColorspace open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <RemoveAlpha open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <EnsureAlpha open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <ExtractChannel open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Bandbool open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Text open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
      <Create open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} values={values} />
    </nav>
  );
}
