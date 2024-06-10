import { ArrayParam, Collapsable, SectionProps } from "..";

export function Gamma({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Gamma"
        open={open.gamma}
        setOpen={(val) => setOpen({ ...open, gamma: val })}
    >
        <ArrayParam
            name="gamma"
            current={values.gamma}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, gamma: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    gamma: false,
                });
            }}
            mayApply
            required
            applied={applied.gamma}
        />
    </Collapsable>

}