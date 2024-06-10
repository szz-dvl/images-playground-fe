import { ArrayParam, Collapsable, SectionProps } from "..";

export function Linear({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Linear"
        open={open.linear}
        setOpen={(val) => setOpen({ ...open, linear: val })}
    >
        <ArrayParam
            name="linear.a"
            current={values["linear.a"]}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "linear.a": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "linear.a": false,
                });
            }}
            mayApply
            required
            applied={applied["linear.a"]}
        />
        <ArrayParam
            name="linear.b"
            current={values["linear.b"]}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "linear.b": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "linear.b": false,
                });
            }}
            mayApply
            required
            applied={applied["linear.b"]}
        />
    </Collapsable>

}