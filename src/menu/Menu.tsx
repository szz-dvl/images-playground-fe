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
} from ".";
import "./Menu.css";

type MenuProps = {
  appendParam: (param: string, value: string | Array<string>) => void;
  removeParam: (param: Array<string>) => void;
};

export function Menu({ appendParam, removeParam }: MenuProps) {
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
  });

  return (
    <nav>
      <Resize open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Extend open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Extract open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Extract after open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Trim open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Rotate open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Rotate after open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Flip open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Flop open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Affine open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Sharpen open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Median open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Blur open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Flatten open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Unflatten open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Gamma open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Negate open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Normalise open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Clahe open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Convolve open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Threshold open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Linear open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Recomb open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Modulate open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Tint open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Grayscale open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <PipelineColorspace open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <ToColorspace open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <RemoveAlpha open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <EnsureAlpha open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <ExtractChannel open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
      <Bandbool open={open} setOpen={setOpen} applied={applied} setApplied={setApplied} appendParam={appendParam} removeParam={removeParam} />
    </nav>
  );
}
