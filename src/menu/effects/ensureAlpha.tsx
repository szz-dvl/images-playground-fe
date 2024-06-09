import { Collapsable, NumericParam, SectionProps } from "..";

export function EnsureAlpha({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
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
}