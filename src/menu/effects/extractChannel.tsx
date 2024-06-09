import { Collapsable, EnumParam, SectionProps } from "..";

export function ExtractChannel({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="ExtractChannel"
        open={open.extractChannel}
        setOpen={(val) => setOpen({ ...open, extractChannel: val })}
    >
        <EnumParam
            name="extractChannel"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, extractChannel: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    extractChannel: false,
                });
            }}
            mayApply
            required
            applied={applied.extractChannel}
            options={["red", "green", "blue", "alpha"]}
        />
    </Collapsable>
}