import { Collapsable, ColorParam, NumericParam, SectionProps } from "..";

export function Rotate({ open, applied, appendParam, removeParam, setApplied, setOpen, after }: SectionProps & { after?: boolean }) {

    const key = after ? "rotateAfter" : "rotate";

    return <Collapsable
        section={ after ? "RotateAfter" : "Rotate" }
        open={after ? open.rotateAfter : open.rotate}
        setOpen={(val) => after ? setOpen({ ...open, rotateAfter: val }) : setOpen({ ...open, rotate: val })}
    >
        <NumericParam
            name={key}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, [key]: true });
            }}
            removeParam={(param) => {
                removeParam([...param, `${key}.background`]);
                setApplied({
                    ...applied,
                    [key]: false,
                    [key + ".background"]: false,
                });
            }}
            mayApply
            required
            applied={applied[key]}
        />
        <ColorParam
            name={key + ".background"}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, [key + ".background"]: true });
            }}
            removeParam={(param) => {
                removeParam(param);
                setApplied({ ...applied, [key + ".background"]: false });
            }}
            mayApply={applied[key]}
            applied={applied[key + ".background"]}
        />
    </Collapsable>
}