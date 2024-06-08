import React, { ReactNode, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import "./Menu.css";

type MenuProps = {
  appendParam: (param: string, value: string | Array<string>) => void;
  removeParam: (param: Array<string>) => void;
};

type ParamProps = {
  appendParam: (param: string, value: string | Array<string>) => void;
  removeParam: (param: Array<string>) => void;
  mayApply: boolean;
  applied: boolean;
  name: string;
  required?: boolean;
};

function NumericParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  required,
}: ParamProps) {
  const [value, setValue] = useState(0);

  return applied ? (
    <span className="value-applied">
      <label htmlFor={name}>{required ? <b> {name} </b> : name}: </label>
      <input readOnly type="number" name={name} min={0} value={value} />
      <button
        onClick={() => {
          removeParam([name]);
        }}
      >
        Remove
      </button>
    </span>
  ) : (
    <span className="value-unapplied">
      <label htmlFor={name}>{required ? <b> {name} </b> : name}: </label>
      <input
        type="number"
        name={name}
        min={0}
        value={value}
        onChange={(ev) => {
          setValue(Number(ev.target.value));
        }}
      />
      <button
        onClick={() => {
          if (mayApply) {
            appendParam(name, value.toString());
          }
        }}
      >
        Apply
      </button>
    </span>
  );
}

function ColorParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  required,
}: ParamProps) {
  const [value, setValue] = useState("#000000");

  return applied ? (
    <span className="value-applied">
      <label htmlFor={name}>{required ? <b> {name} </b> : name}: </label>
      <input readOnly type="text" name={name} value={value} />
      <button
        onClick={() => {
          removeParam([name]);
        }}
      >
        Remove
      </button>
    </span>
  ) : (
    <span className="value-unapplied">
      <label htmlFor={name}>{required ? <b> {name} </b> : name}: </label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
        }}
      />
      <button
        onClick={() => {
          const match = /^#[A-F-0-9]{6}$/.exec(value);
          if (match && mayApply) {
            appendParam(name, value);
          }
        }}
      >
        Apply
      </button>
    </span>
  );
}

type EnumParamProps = ParamProps & { options: Array<string> };

function EnumParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  options,
  required,
}: EnumParamProps) {
  const [value, setValue] = useState(options[0]);

  return (
    <span className="value-unapplied">
      <label htmlFor={name}>{required ? <b> {name} </b> : name}: </label>
      <select onChange={(ev) => setValue(ev.target.value)} disabled={applied}>
        {options.map((opt) => (
          <option value={opt}> {opt} </option>
        ))}
      </select>
      <button
        onClick={() =>
          applied
            ? removeParam([name])
            : mayApply
            ? appendParam(name, value)
            : void 0
        }
      >
        {applied ? "Remove" : "Apply"}
      </button>
    </span>
  );
}

function ArrayParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  required,
}: ParamProps) {
  const [value, setValue] = useState("");

  return applied ? (
    <span className="value-applied">
      <label htmlFor={name}>{required ? <b> {name} </b> : name}: </label>
      <input readOnly type="text" name={name} value={value} />
      <button
        onClick={() => {
          removeParam([name]);
        }}
      >
        Remove
      </button>
    </span>
  ) : (
    <span className="value-unapplied">
      <label htmlFor={name}>{required ? <b> {name} </b> : name}: </label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
        }}
      />
      <button
        onClick={() => {
          const array = value.split(",");
          if (mayApply) {
            appendParam(name, array);
          }
        }}
      >
        Apply
      </button>
    </span>
  );
}

function BooleanParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  required,
}: ParamProps) {
  const [value, setValue] = useState(false);

  return (
    <span className="value-applied">
      <label htmlFor={name}>{required ? <b> {name} </b> : name}: </label>
      <input
        type="checkbox"
        name={name}
        checked={value}
        onChange={(ev) => setValue(ev.target.checked)}
      />
      <button
        onClick={() => {
          applied
            ? removeParam([name])
            : mayApply
            ? appendParam(name, value ? "true" : "false")
            : void 0;
        }}
      >
        {applied ? "Remove" : "Apply"}
      </button>
    </span>
  );
}

type CollapsableProps = {
  section: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  children: ReactNode;
};
function Collapsable({ section, open, setOpen, children }: CollapsableProps) {
  return (
    <div className="collapsable">
      <div className="header">
        <span className="section">{section}</span>
        <span className="icon">
          {open ? (
            <FaAngleUp onClick={() => setOpen(false)} />
          ) : (
            <FaAngleDown onClick={() => setOpen(true)} />
          )}
        </span>
      </div>
      {open ? children : null}
    </div>
  );
}

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
      <Collapsable
        section="Resize"
        open={open.resize}
        setOpen={(val) => setOpen({ ...open, resize: val })}
      >
        {["resize.width", "resize.height"].map((key) => (
          <NumericParam
            name={key}
            appendParam={(param, value) => {
              appendParam(param, value);
              setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
              removeParam([...param]);
              setApplied({
                ...applied,
                [key]: false,
              });
            }}
            mayApply
            applied={applied[key]}
          />
        ))}
        <EnumParam
          name="resize.fit"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "resize.fit": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "resize.fit": false,
            });
          }}
          mayApply
          applied={applied["resize.fit"]}
          options={["cover", "contain", "fill", "inside", "outside"]}
        />
        <EnumParam
          name="resize.position"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "resize.position": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "resize.position": false,
            });
          }}
          mayApply
          applied={applied["resize.position"]}
          options={[
            "center",
            "top",
            "right top",
            "right",
            "right bottom",
            "bottom",
            "left",
            "left bottom",
            "left top",
          ]}
        />
        <ColorParam
          name="resize.background"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "resize.background": true });
          }}
          removeParam={(param) => {
            removeParam(param);
            setApplied({ ...applied, "resize.background": false });
          }}
          mayApply
          applied={applied["resize.background"]}
        />
        <EnumParam
          name="resize.kernel"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "resize.kernel": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "resize.kernel": false,
            });
          }}
          mayApply
          applied={applied["resize.kernel"]}
          options={[
            "nearest",
            "linear",
            "cubic",
            "mitchell",
            "lanczos2",
            "lanczos3",
          ]}
        />
        {[
          "resize.withoutEnlargement",
          "resize.withoutReduction",
          "resize.fastShrinkOnLoad",
        ].map((key) => (
          <BooleanParam
            name={key}
            appendParam={(param, value) => {
              appendParam(param, value);
              setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
              removeParam(param);
              setApplied({ ...applied, [key]: false });
            }}
            mayApply
            applied={applied[key]}
          />
        ))}
      </Collapsable>
      <Collapsable
        section="Extend"
        open={open.extend}
        setOpen={(val) => setOpen({ ...open, extend: val })}
      >
        <NumericParam
          name="extend"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, extend: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              extend: false,
            });
          }}
          mayApply
          required
          applied={applied.extend}
        />

        {["extend.top", "extend.left", "extend.bottom", "extend.right"].map(
          (key) => (
            <NumericParam
              name={key}
              appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, [key]: true });
              }}
              removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                  ...applied,
                  [key]: false,
                });
              }}
              mayApply
              applied={applied[key]}
            />
          )
        )}
        <EnumParam
          name="extend.extendWith"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "extend.extendWith": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "extend.extendWith": false,
            });
          }}
          mayApply
          applied={applied["extend.extendWith"]}
          options={["background", "copy", "repeat", "mirror"]}
        />
        <ColorParam
          name="extend.background"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "extend.background": true });
          }}
          removeParam={(param) => {
            removeParam(param);
            setApplied({ ...applied, "extend.background": false });
          }}
          mayApply
          applied={applied["extend.background"]}
        />
      </Collapsable>
      <Collapsable
        section="Extract"
        open={open.extract}
        setOpen={(val) => setOpen({ ...open, extract: val })}
      >
        {["extract.top", "extract.left", "extract.width", "extract.height"].map(
          (key) => (
            <NumericParam
              name={key}
              appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, [key]: true });
              }}
              removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                  ...applied,
                  [key]: false,
                });
              }}
              mayApply
              required
              applied={applied[key]}
            />
          )
        )}
      </Collapsable>
      <Collapsable
        section="ExtractAfter"
        open={open.extractAfter}
        setOpen={(val) => setOpen({ ...open, extractAfter: val })}
      >
        {[
          "extractAfter.top",
          "extractAfter.left",
          "extractAfter.width",
          "extractAfter.height",
        ].map((key) => (
          <NumericParam
            name={key}
            appendParam={(param, value) => {
              appendParam(param, value);
              setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
              removeParam([...param]);
              setApplied({
                ...applied,
                [key]: false,
              });
            }}
            mayApply
            required
            applied={applied[key]}
          />
        ))}
      </Collapsable>
      <Collapsable
        section="Trim"
        open={open.trim}
        setOpen={(val) => setOpen({ ...open, trim: val })}
      >
        <ColorParam
          name="trim.background"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "trim.background": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "trim.background": false,
            });
          }}
          mayApply
          applied={applied["trim.background"]}
        />
        <NumericParam
          name="trim.threshold"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "trim.threshold": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "trim.threshold": false,
            });
          }}
          mayApply
          applied={applied["trim.threshold"]}
        />
        <BooleanParam
          name="trim.lineArt"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "trim.lineArt": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "trim.lineArt": false,
            });
          }}
          mayApply
          applied={applied["trim.lineArt"]}
        />
      </Collapsable>
      <Collapsable
        section="Rotate"
        open={open.rotate}
        setOpen={(val) => setOpen({ ...open, rotate: val })}
      >
        <NumericParam
          name="rotate"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, rotate: true });
          }}
          removeParam={(param) => {
            removeParam([...param, "rotate.background"]);
            setApplied({
              ...applied,
              rotate: false,
              "rotate.background": false,
            });
          }}
          mayApply
          required
          applied={applied.rotate}
        />
        <ColorParam
          name="rotate.background"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "rotate.background": true });
          }}
          removeParam={(param) => {
            removeParam(param);
            setApplied({ ...applied, "rotate.background": false });
          }}
          mayApply={applied.rotate}
          applied={applied["rotate.background"]}
        />
      </Collapsable>
      <Collapsable
        section="RotateAfter"
        open={open.rotateAfter}
        setOpen={(val) => setOpen({ ...open, rotateAfter: val })}
      >
        <NumericParam
          name="rotateAfter"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, rotateAfter: true });
          }}
          removeParam={(param) => {
            removeParam([...param, "rotateAfter.background"]);
            setApplied({
              ...applied,
              rotateAfter: false,
              "rotateAfter.background": false,
            });
          }}
          mayApply
          required
          applied={applied.rotateAfter}
        />
        <ColorParam
          name="rotateAfter.background"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "rotateAfter.background": true });
          }}
          removeParam={(param) => {
            removeParam(param);
            setApplied({ ...applied, "rotateAfter.background": false });
          }}
          mayApply={applied.rotateAfter}
          applied={applied["rotateAfter.background"]}
        />
      </Collapsable>
      <Collapsable
        section="Flip"
        open={open.flip}
        setOpen={(val) => setOpen({ ...open, flip: val })}
      >
        <BooleanParam
          name="flip"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, flip: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({ ...applied, flip: false });
          }}
          mayApply
          required
          applied={applied.flip}
        />
      </Collapsable>
      <Collapsable
        section="Flop"
        open={open.flop}
        setOpen={(val) => setOpen({ ...open, flop: val })}
      >
        <BooleanParam
          name="flop"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, flop: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({ ...applied, flop: false });
          }}
          mayApply
          required
          applied={applied.flop}
        />
      </Collapsable>
      <Collapsable
        section="Affine"
        open={open.affine}
        setOpen={(val) => setOpen({ ...open, affine: val })}
      >
        <ArrayParam
          name="affine"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, affine: true });
          }}
          removeParam={(param) => {
            removeParam([
              ...param,
              "affine.background",
              "affine.idx",
              "affine.idy",
              "affine.odx",
              "affine.ody",
              "affine.interpolator",
            ]);
            setApplied({
              ...applied,
              affine: false,
              "affine.background": false,
              "affine.idx": false,
              "affine.idy": false,
              "affine.odx": false,
              "affine.ody": false,
              "affine.interpolator": false,
            });
          }}
          mayApply
          required
          applied={applied.affine}
        />
        <ColorParam
          name="affine.background"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "affine.background": true });
          }}
          removeParam={(param) => {
            removeParam(param);
            setApplied({ ...applied, "affine.background": false });
          }}
          mayApply={applied.affine}
          applied={applied["affine.background"]}
        />
        <NumericParam
          name="affine.idx"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "affine.idx": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "affine.idx": false,
            });
          }}
          mayApply={applied.affine}
          applied={applied["affine.idx"]}
        />
        <NumericParam
          name="affine.idy"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "affine.idy": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "affine.idy": false,
            });
          }}
          mayApply={applied.affine}
          applied={applied["affine.idy"]}
        />
        <NumericParam
          name="affine.odx"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "affine.odx": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "affine.odx": false,
            });
          }}
          mayApply={applied.affine}
          applied={applied["affine.odx"]}
        />
        <NumericParam
          name="affine.ody"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "affine.ody": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "affine.ody": false,
            });
          }}
          mayApply={applied.affine}
          applied={applied["affine.ody"]}
        />
        <EnumParam
          name="affine.interpolator"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "affine.interpolator": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "affine.interpolator": false,
            });
          }}
          mayApply={applied.affine}
          applied={applied["affine.interpolator"]}
          options={["nearest", "bilinear", "bicubic", "lbb", "nohalo", "vsqbs"]}
        />
      </Collapsable>
      <Collapsable
        section="Sharpen"
        open={open.sharpen}
        setOpen={(val) => setOpen({ ...open, sharpen: val })}
      >
        <BooleanParam
          name="sharpen"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, sharpen: true });
          }}
          removeParam={(param) => {
            removeParam([
              ...param,
              "sharpen.sigma",
              "sharpen.m1",
              "sharpen.m2",
              "sharpen.x1",
              "sharpen.y2",
              "sharpen.y3",
            ]);
            setApplied({
              ...applied,
              sharpen: false,
              "sharpen.sigma": false,
              "sharpen.m1": false,
              "sharpen.m2": false,
              "sharpen.x1": false,
              "sharpen.y2": false,
              "sharpen.y3": false,
            });
          }}
          mayApply
          required
          applied={applied.sharpen}
        />
        <NumericParam
          name="sharpen.sigma"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "sharpen.sigma": true });
          }}
          removeParam={(param) => {
            removeParam([
              ...param,
              "sharpen.m1",
              "sharpen.m2",
              "sharpen.x1",
              "sharpen.y2",
              "sharpen.y3",
            ]);
            setApplied({
              ...applied,
              "sharpen.sigma": false,
              "sharpen.m1": false,
              "sharpen.m2": false,
              "sharpen.x1": false,
              "sharpen.y2": false,
              "sharpen.y3": false,
            });
          }}
          mayApply={applied.sharpen}
          required
          applied={applied["sharpen.sigma"]}
        />
        {[
          "sharpen.m1",
          "sharpen.m2",
          "sharpen.x1",
          "sharpen.y2",
          "sharpen.y3",
        ].map((key) => (
          <NumericParam
            name={key}
            appendParam={(param, value) => {
              appendParam(param, value);
              setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
              removeParam([...param]);
              setApplied({
                ...applied,
                [key]: false,
              });
            }}
            mayApply={applied.sharpen}
            applied={applied[key]}
          />
        ))}
      </Collapsable>
      <Collapsable
        section="Median"
        open={open.median}
        setOpen={(val) => setOpen({ ...open, median: val })}
      >
        <NumericParam
          name="median"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, median: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              median: false,
            });
          }}
          mayApply
          required
          applied={applied.median}
        />
      </Collapsable>
      <Collapsable
        section="Blur"
        open={open.blur}
        setOpen={(val) => setOpen({ ...open, blur: val })}
      >
        <NumericParam
          name="blur"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, blur: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              blur: false,
            });
          }}
          mayApply
          required
          applied={applied.blur}
        />
      </Collapsable>
      <Collapsable
        section="Flatten"
        open={open.flatten}
        setOpen={(val) => setOpen({ ...open, flatten: val })}
      >
        <BooleanParam
          name="flatten"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, flatten: true });
          }}
          removeParam={(param) => {
            removeParam([...param, "flatten.background"]);
            setApplied({
              ...applied,
              flatten: false,
              "flatten.background": false,
            });
          }}
          mayApply
          required
          applied={applied.flatten}
        />
        <ColorParam
          name="flatten.background"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "flatten.background": true });
          }}
          removeParam={(param) => {
            removeParam(param);
            setApplied({ ...applied, "flatten.background": false });
          }}
          mayApply={applied.flatten}
          applied={applied["flatten.background"]}
        />
      </Collapsable>
      <Collapsable
        section="Unflatten"
        open={open.unflatten}
        setOpen={(val) => setOpen({ ...open, unflatten: val })}
      >
        <BooleanParam
          name="unflatten"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, unflatten: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              unflatten: false,
            });
          }}
          mayApply
          required
          applied={applied.unflatten}
        />
      </Collapsable>
      <Collapsable
        section="Gamma"
        open={open.gamma}
        setOpen={(val) => setOpen({ ...open, gamma: val })}
      >
        <ArrayParam
          name="gamma"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, gamma: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              gamma: false,
            });
          }}
          mayApply
          required
          applied={applied.gamma}
        />
      </Collapsable>
      <Collapsable
        section="Negate"
        open={open.negate}
        setOpen={(val) => setOpen({ ...open, negate: val })}
      >
        <BooleanParam
          name="negate"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, negate: true });
          }}
          removeParam={(param) => {
            removeParam([...param, "negate.alpha"]);
            setApplied({
              ...applied,
              negate: false,
              "negate.alpha": false,
            });
          }}
          mayApply
          required
          applied={applied.negate}
        />
        <BooleanParam
          name="negate.alpha"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "negate.alpha": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "negate.alpha": false,
            });
          }}
          mayApply={applied.negate}
          applied={applied["negate.alpha"]}
        />
      </Collapsable>
      <Collapsable
        section="Normalise"
        open={open.normalise}
        setOpen={(val) => setOpen({ ...open, normalise: val })}
      >
        <BooleanParam
          name="normalise"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, normalise: true });
          }}
          removeParam={(param) => {
            removeParam([...param, "normalise.upper", "normalise.lower"]);
            setApplied({
              ...applied,
              normalise: false,
              "normalise.lower": false,
              "normalise.upper": false,
            });
          }}
          mayApply
          required
          applied={applied.normalise}
        />
        {["normalise.lower", "normalise.upper"].map((key) => (
          <NumericParam
            name={key}
            appendParam={(param, value) => {
              appendParam(param, value);
              setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
              removeParam([...param]);
              setApplied({
                ...applied,
                [key]: false,
              });
            }}
            mayApply={applied.normalise}
            applied={applied[key]}
          />
        ))}
      </Collapsable>
      <Collapsable
        section="CLAHE"
        open={open.clahe}
        setOpen={(val) => setOpen({ ...open, clahe: val })}
      >
        {["clahe.width", "clahe.height", "clahe.maxSlope"].map((key) => (
          <NumericParam
            name={key}
            appendParam={(param, value) => {
              appendParam(param, value);
              setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
              removeParam([...param]);
              setApplied({
                ...applied,
                [key]: false,
              });
            }}
            mayApply
            required={key !== "clahe.maxSlope"}
            applied={applied[key]}
          />
        ))}
      </Collapsable>
      <Collapsable
        section="Convolve"
        open={open.convolve}
        setOpen={(val) => setOpen({ ...open, convolve: val })}
      >
        <ArrayParam
          name="convolve.kernel"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "convolve.kernel": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "convolve.kernel": false,
            });
          }}
          mayApply
          required
          applied={applied["convolve.kernel"]}
        />
        {[
          "convolve.width",
          "convolve.height",
          "convolve.scale",
          "convolve.offset",
        ].map((key) => (
          <NumericParam
            name={key}
            appendParam={(param, value) => {
              appendParam(param, value);
              setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
              removeParam([...param]);
              setApplied({
                ...applied,
                [key]: false,
              });
            }}
            mayApply
            required={["convolve.height", "convolve.width"].includes(key)}
            applied={applied[key]}
          />
        ))}
      </Collapsable>
      <Collapsable
        section="Threshold"
        open={open.threshold}
        setOpen={(val) => setOpen({ ...open, threshold: val })}
      >
        <NumericParam
          name="threshold"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, threshold: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              threshold: false,
            });
          }}
          mayApply
          required
          applied={applied.threshold}
        />
        <BooleanParam
          name="threshold.grayscale"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "threshold.grayscale": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "threshold.grayscale": false,
            });
          }}
          mayApply={applied.threshold}
          applied={applied["threshold.grayscale"]}
        />
      </Collapsable>
      <Collapsable
        section="Linear"
        open={open.linear}
        setOpen={(val) => setOpen({ ...open, linear: val })}
      >
        <ArrayParam
          name="linear.a"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "linear.a": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "linear.a": false,
            });
          }}
          mayApply
          required
          applied={applied["linear.a"]}
        />
        <ArrayParam
          name="linear.b"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, "linear.b": true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              "linear.b": false,
            });
          }}
          mayApply
          required
          applied={applied["linear.b"]}
        />
      </Collapsable>
      <Collapsable
        section="Recomb"
        open={open.recomb}
        setOpen={(val) => setOpen({ ...open, recomb: val })}
      >
        {["recomb.0", "recomb.1", "recomb.2"].map((key) => (
          <ArrayParam
            name={key}
            appendParam={(param, value) => {
              appendParam(param, value);
              setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
              removeParam([...param]);
              setApplied({
                ...applied,
                [key]: false,
              });
            }}
            mayApply
            required
            applied={applied[key]}
          />
        ))}
      </Collapsable>
      <Collapsable
        section="Modulate"
        open={open.modulate}
        setOpen={(val) => setOpen({ ...open, modulate: val })}
      >
        {[
          "modulate.saturation",
          "modulate.brightness",
          "modulate.hue",
          "modulate.lightness",
        ].map((key) => (
          <NumericParam
            name={key}
            appendParam={(param, value) => {
              appendParam(param, value);
              setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
              removeParam([...param]);
              setApplied({
                ...applied,
                [key]: false,
              });
            }}
            mayApply
            applied={applied[key]}
          />
        ))}
      </Collapsable>
      <Collapsable
        section="Tint"
        open={open.tint}
        setOpen={(val) => setOpen({ ...open, tint: val })}
      >
        <ColorParam
          name="tint"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, tint: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              tint: false,
            });
          }}
          mayApply
          required
          applied={applied.tint}
        />
      </Collapsable>
      <Collapsable
        section="Grayscale"
        open={open.grayscale}
        setOpen={(val) => setOpen({ ...open, grayscale: val })}
      >
        <BooleanParam
          name="grayscale"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, grayscale: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              grayscale: false,
            });
          }}
          mayApply
          required
          applied={applied.grayscale}
        />
      </Collapsable>
      <Collapsable
        section="PipelineColorspace"
        open={open.pipelineColorspace}
        setOpen={(val) => setOpen({ ...open, pipelineColorspace: val })}
      >
        <EnumParam
          name="pipelineColorspace"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, pipelineColorspace: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              pipelineColorspace: false,
            });
          }}
          mayApply
          required
          applied={applied.pipelineColorspace}
          options={[
            "multiband",
            "b-w",
            "histogram",
            "xyz",
            "lab",
            "cmyk",
            "labq",
            "rgb",
            "cmc",
            "lch",
            "labs",
            "srgb",
            "yxy",
            "fourier",
            "rgb16",
            "grey16",
            "matrix",
            "scrgb",
            "hsv",
          ]}
        />
      </Collapsable>
      <Collapsable
        section="ToColorspace"
        open={open.toColorspace}
        setOpen={(val) => setOpen({ ...open, toColorspace: val })}
      >
        <EnumParam
          name="toColorspace"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, toColorspace: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              toColorspace: false,
            });
          }}
          mayApply
          required
          applied={applied.toColorspace}
          options={[
            "multiband",
            "b-w",
            "histogram",
            "xyz",
            "lab",
            "cmyk",
            "labq",
            "rgb",
            "cmc",
            "lch",
            "labs",
            "srgb",
            "yxy",
            "fourier",
            "rgb16",
            "grey16",
            "matrix",
            "scrgb",
            "hsv",
          ]}
        />
      </Collapsable>
      <Collapsable
        section="RemoveAlpha"
        open={open.removeAlpha}
        setOpen={(val) => setOpen({ ...open, removeAlpha: val })}
      >
        <BooleanParam
          name="removeAlpha"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, removeAlpha: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              removeAlpha: false,
            });
          }}
          mayApply
          required
          applied={applied.removeAlpha}
        />
      </Collapsable>
      <Collapsable
        section="EnsureAlpha"
        open={open.ensureAlpha}
        setOpen={(val) => setOpen({ ...open, ensureAlpha: val })}
      >
        <NumericParam
          name="ensureAlpha"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, ensureAlpha: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              ensureAlpha: false,
            });
          }}
          mayApply
          required
          applied={applied.ensureAlpha}
        />
      </Collapsable>
      <Collapsable
        section="ExtractChannel"
        open={open.extractChannel}
        setOpen={(val) => setOpen({ ...open, extractChannel: val })}
      >
        <EnumParam
          name="extractChannel"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, extractChannel: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              extractChannel: false,
            });
          }}
          mayApply
          required
          applied={applied.extractChannel}
          options={["red", "green", "blue", "alpha"]}
        />
      </Collapsable>
      <Collapsable
        section="Bandbool"
        open={open.bandbool}
        setOpen={(val) => setOpen({ ...open, bandbool: val })}
      >
        <EnumParam
          name="bandbool"
          appendParam={(param, value) => {
            appendParam(param, value);
            setApplied({ ...applied, bandbool: true });
          }}
          removeParam={(param) => {
            removeParam([...param]);
            setApplied({
              ...applied,
              bandbool: false,
            });
          }}
          mayApply
          required
          applied={applied.bandbool}
          options={["and", "or", "eor"]}
        />
      </Collapsable>
    </nav>
  );
}
