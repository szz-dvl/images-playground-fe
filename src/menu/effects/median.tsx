import { Collapsable, NumericParam, SectionProps } from "..";

export function Median({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
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
}