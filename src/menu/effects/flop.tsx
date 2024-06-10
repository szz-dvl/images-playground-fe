import { BooleanParam, Collapsable, SectionProps } from "..";

export function Flop({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Flop"
        open={open.flop}
        setOpen={(val) => setOpen({ ...open, flop: val })}
    >
        <BooleanParam
            name="flop"
            current={values.flop}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, flop: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({ ...applied, flop: false });
            }}
            mayApply
            required
            applied={applied.flop}
        />
    </Collapsable>
}