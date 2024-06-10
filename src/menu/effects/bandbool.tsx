import { Collapsable, EnumParam, SectionProps } from "..";

export function Bandbool({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Bandbool"
        open={open.bandbool}
        setOpen={(val) => setOpen({ ...open, bandbool: val })}
    >
        <EnumParam
            name="bandbool"
            current={values.bandbool}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, bandbool: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    bandbool: false,
                });
            }}
            mayApply
            required
            applied={applied.bandbool}
            options={["and", "or", "eor"]}
        />
    </Collapsable>
}