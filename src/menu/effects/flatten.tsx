import { BooleanParam, Collapsable, ColorParam, SectionProps } from "..";

export function Flatten({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
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
}