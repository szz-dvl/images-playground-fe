import { ParsedUrlQuery } from "querystring";
import React, { ReactNode, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

export type SectionProps = {
  open: Record<string, boolean>,
  setOpen: (record: Record<string, boolean>) => void;
  appendParam: (param: string, value: string | Array<string>, generated?: boolean) => void;
  removeParam: (param: Array<string>) => void;
  setApplied: (record: Record<string, boolean>) => void;
  applied: Record<string, boolean>
  values: ParsedUrlQuery
}

export type ParamProps = {
  appendParam: (param: string, value: string | Array<string>, generated?: boolean) => void;
  removeParam: (param: Array<string>) => void;
  mayApply: boolean;
  applied: boolean;
  name: string;
  required?: boolean;
  current?: string | string[]
};

export function NumericParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  required,
  current
}: ParamProps) {
  const [value, setValue] = useState(current ? Number(current) : 0);

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
          if (ev.target.value)
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

export function ColorParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  required,
  current
}: ParamProps) {
  const [value, setValue] = useState(current ? current.toString() : "#000000");

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

export function StringParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  required,
  current
}: ParamProps) {
  const [value, setValue] = useState(current || "");

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
          if (mayApply) {
            appendParam(name, value);
          }
        }}
      >
        Apply
      </button>
    </span>
  );
}

export type EnumParamProps = ParamProps & { options: Array<string> };

export function EnumParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  options,
  required,
  current
}: EnumParamProps) {
  const [value, setValue] = useState(current || options[0]);

  return (
    <span className="value-applied">
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

export function ArrayParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  required,
  current
}: ParamProps) {
  const [value, setValue] = useState(current ? current.toString() : "");

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

export function BooleanParam({
  name,
  appendParam,
  removeParam,
  mayApply,
  applied,
  required,
  current
}: ParamProps) {
  const [value, setValue] = useState(current ? current !== "false" : false);

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

export type CollapsableProps = {
  section: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  children: ReactNode;
};

export function Collapsable({ section, open, setOpen, children }: CollapsableProps) {
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

export { Resize } from "./effects/resize";
export { Extend } from "./effects/extend";
export { Extract } from "./effects/extract";
export { Trim } from "./effects/trim";
export { Rotate } from "./effects/rotate";
export { Flip } from "./effects/flip";
export { Flop } from "./effects/flop";
export { Affine } from "./effects/affine";
export { Sharpen } from "./effects/sharpen";
export { Median } from "./effects/median";
export { Blur } from "./effects/blur";
export { Flatten } from "./effects/flatten";
export { Unflatten } from "./effects/unflatten";
export { Gamma } from "./effects/gamma";
export { Negate } from "./effects/negate";
export { Normalise } from "./effects/normalise";
export { Clahe } from "./effects/clahe";
export { Convolve } from "./effects/convolve";
export { Threshold } from "./effects/threshold";
export { Linear } from "./effects/linear";
export { Recomb } from "./effects/recomb";
export { Modulate } from "./effects/modulate";
export { Tint } from "./effects/tint";
export { Grayscale } from "./effects/grayscale";
export { PipelineColorspace } from "./effects/pipelineColorspace";
export { ToColorspace } from "./effects/toColorspace";
export { RemoveAlpha } from "./effects/removeAlpha";
export { EnsureAlpha } from "./effects/ensureAlpha";
export { ExtractChannel } from "./effects/extractChannel";
export { Bandbool } from "./effects/bandbool";
export { Text } from "./effects/text";
export { Create } from "./effects/create";
