import { Collapsable, ColorParam, SectionProps } from "..";

export function Tint({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
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
}