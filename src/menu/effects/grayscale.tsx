import { BooleanParam, Collapsable, SectionProps } from "..";

export function Grayscale({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Grayscale"
        open={open.grayscale}
        setOpen={(val) => setOpen({ ...open, grayscale: val })}
    >
        <BooleanParam
            name="grayscale"
            current={values.grayscale}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, grayscale: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    grayscale: false,
                });
            }}
            mayApply
            required
            applied={applied.grayscale}
        />
    </Collapsable>
}