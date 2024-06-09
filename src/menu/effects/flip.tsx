import { BooleanParam, Collapsable, SectionProps } from "..";

export function Flip({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="Flip"
        open={open.flip}
        setOpen={(val) => setOpen({ ...open, flip: val })}
    >
        <BooleanParam
            name="flip"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, flip: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({ ...applied, flip: false });
            }}
            mayApply
            required
            applied={applied.flip}
        />
    </Collapsable>
}