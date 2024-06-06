import React, { ReactNode, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import "./Menu.css";

type MenuProps = {
  appendParam: (param: string, value: string) => void;
  removeParam: (param: Array<string>) => void;
};

type ParamProps = {
  appendParam: (param: string, value: string) => void;
  removeParam: (param: Array<string>) => void;
  mayApply: boolean;
  applied: boolean;
  name: string;
};

function NumericParam({ name, appendParam, removeParam, mayApply, applied }: ParamProps) {
  const [value, setValue] = useState(0);

  return applied ? (
    <span className="value-applied">
      <label htmlFor={name}>{name}: </label>
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
      <label htmlFor={name}>{name}: </label>
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

function ColorParam({ name, appendParam, removeParam, mayApply, applied }: ParamProps) {
  const [value, setValue] = useState("#000000");
  
  return applied ? (
    <span className="value-applied">
      <label htmlFor={name}>{name}: </label>
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
      <label htmlFor={name}>{name}: </label>
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

function BooleanParam({ name, appendParam, removeParam, mayApply, applied }: ParamProps) {
  
  const [value, setValue] = useState(false);

  return (
    <span className="value-applied">
      <label htmlFor={name}>{name}: </label>
      <input  type="checkbox" name={name} checked={value} onChange={ (ev) => setValue(ev.target.checked) } />
      <button
        onClick={() => {
          applied ? removeParam([name]) : appendParam(name, value ? "true" : "false");
        }}
      >
        { applied ? "Remove" : "Apply" }
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
  const [open, setOpen] = useState({ 
    rotate: false, 
    flip: false,
    flop: false
  });
  const [applied, setApplied] = useState({ 
    rotate: false, 
    "rotate.background": false,
    flip: false,
    flop: false 
  })

  return (
    <nav>
      <Collapsable section="Rotate" open={open.rotate} setOpen={(val) => setOpen({...open, rotate: val })}>
        <NumericParam
          name="rotate"
          appendParam={(param, value) => {
            appendParam(param, value)
            setApplied({...applied, rotate: true})
          }}
          removeParam={(param) => {
            removeParam([...param, "rotate.background"])
            setApplied({...applied, rotate: false, "rotate.background": false })
          }}
          mayApply
          applied={applied.rotate}
        ></NumericParam>
        <ColorParam
          name="rotate.background"
          appendParam={(param, value) => {
            if (applied.rotate)
              appendParam(param, value)
              setApplied({...applied, "rotate.background": true })
          }}
          removeParam={(param) => {
            removeParam(param)
            setApplied({...applied, "rotate.background": false })
          }}
          mayApply={applied.rotate}
          applied={applied["rotate.background"]}
        ></ColorParam>
      </Collapsable>
      <Collapsable section="Flip" open={open.flip} setOpen={(val) => setOpen({...open, flip: val })}>
        <BooleanParam
          name="flip"
          appendParam={(param, value) => {
            appendParam(param, value)
            setApplied({...applied, flip: true})
          }}
          removeParam={(param) => {
            removeParam([ ...param ])
            setApplied({...applied, flip: false })
          }}
          mayApply
          applied={applied.flip}
        ></BooleanParam>
      </Collapsable>
      <Collapsable section="Flop" open={open.flop} setOpen={(val) => setOpen({...open, flop: val })}>
        <BooleanParam
          name="flop"
          appendParam={(param, value) => {
            appendParam(param, value)
            setApplied({...applied, flop: true})
          }}
          removeParam={(param) => {
            removeParam([ ...param ])
            setApplied({...applied, flop: false })
          }}
          mayApply
          applied={applied.flop}
        ></BooleanParam>
      </Collapsable>
    </nav>
  );
}
