import { Collapsable, ColorParam, EnumParam, NumericParam, SectionProps } from "..";

export function Extend({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="Extend"
        open={open.extend}
        setOpen={(val) => setOpen({ ...open, extend: val })}
    >
        <NumericParam
            name="extend"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, extend: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    extend: false,
                });
            }}
            mayApply
            required
            applied={applied.extend}
        />

        {["extend.top", "extend.left", "extend.bottom", "extend.right"].map(
            (key) => (
                <NumericParam
                    name={key}
                    appendParam={(param, value) => {
                        appendParam(param, value);
                        setApplied({ ...applied, [key]: true });
                    }}
                    removeParam={(param) => {
                        removeParam([...param]);
                        setApplied({
                            ...applied,
                            [key]: false,
                        });
                    }}
                    mayApply
                    applied={applied[key]}
                />
            )
        )}
        <EnumParam
            name="extend.extendWith"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "extend.extendWith": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "extend.extendWith": false,
                });
            }}
            mayApply
            applied={applied["extend.extendWith"]}
            options={["background", "copy", "repeat", "mirror"]}
        />
        <ColorParam
            name="extend.background"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "extend.background": true });
            }}
            removeParam={(param) => {
                removeParam(param);
                setApplied({ ...applied, "extend.background": false });
            }}
            mayApply
            applied={applied["extend.background"]}
        />
    </Collapsable>
}