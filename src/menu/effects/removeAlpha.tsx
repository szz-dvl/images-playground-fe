import { BooleanParam, Collapsable, SectionProps } from "..";

export function RemoveAlpha({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
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
}