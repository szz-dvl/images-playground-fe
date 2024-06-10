import { BooleanParam, Collapsable, EnumParam, NumericParam, SectionProps, StringParam } from "..";

export function Text({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Text"
        open={open.text}
        setOpen={(val) => setOpen({ ...open, text: val })}
    >

        {
            ["text.text", "text.font", "text.fontfile"].map(key =>
                <StringParam
                    name={key}
                    current={values[key]}
                    appendParam={(param, value) => {
                        appendParam(param, value, true);
                        setApplied({ ...applied, [key]: true });
                    }}
                    removeParam={(param) => {
                        removeParam([...param]);
                        setApplied({
                            ...applied,
                            [key]: false
                        });
                    }}
                    mayApply
                    required={key === "text.text"}
                    applied={applied[key]}
                />)
        }
        {
            ["text.width", "text.height", "text.dpi", "text.spacing"].map(key =>
                <NumericParam
                    name={key}
                    current={values[key]}
                    appendParam={(param, value) => {
                        appendParam(param, value, true);
                        setApplied({ ...applied, [key]: true });
                    }}
                    removeParam={(param) => {
                        removeParam([...param]);
                        setApplied({
                            ...applied,
                            [key]: false
                        });
                    }}
                    mayApply
                    applied={applied[key]}
                />)
        }
        {
            ["text.justify", "text.rgba"].map(key =>
                <BooleanParam
                    name={key}
                    current={values[key]}
                    appendParam={(param, value) => {
                        appendParam(param, value, true);
                        setApplied({ ...applied, [key]: true });
                    }}
                    removeParam={(param) => {
                        removeParam([...param]);
                        setApplied({
                            ...applied,
                            [key]: false
                        });
                    }}
                    mayApply
                    applied={applied[key]}
                />)
        }
        <EnumParam
            name="text.align"
            current={values["text.align"]}
            appendParam={(param, value) => {
                appendParam(param, value, true);
                setApplied({ ...applied, "text.align": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "text.align": false
                });
            }}
            mayApply
            applied={applied["text.align"]}
            options={[
                "left",
                "center",
                "right"
            ]}
        />
        <EnumParam
            name="text.wrap"
            current={values["text.wrap"]}
            appendParam={(param, value) => {
                appendParam(param, value, true);
                setApplied({ ...applied, "text.wrap": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "text.wrap": false
                });
            }}
            mayApply
            applied={applied["text.wrap"]}
            options={[
                "word",
                "word-char",
                "char",
                "none"
            ]}
        />

    </Collapsable>
}