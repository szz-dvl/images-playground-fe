import { Collapsable, NumericParam, SectionProps } from "..";

export function Blur({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="Blur"
        open={open.blur}
        setOpen={(val) => setOpen({ ...open, blur: val })}
    >
        <NumericParam
            name="blur"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, blur: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    blur: false,
                });
            }}
            mayApply
            required
            applied={applied.blur}
        />
    </Collapsable>
}