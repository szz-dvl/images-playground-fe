import { BooleanParam, Collapsable, ColorParam, SectionProps } from "..";

export function Unflatten({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
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
}