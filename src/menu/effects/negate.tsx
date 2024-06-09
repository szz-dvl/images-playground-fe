import { BooleanParam, Collapsable, SectionProps } from "..";

export function Negate({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
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

}