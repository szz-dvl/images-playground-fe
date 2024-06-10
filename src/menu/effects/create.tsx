import { Collapsable, ColorParam, EnumParam, SectionProps, NumericParam } from "..";

export function Create({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Create"
        open={open.create}
        setOpen={(val) => setOpen({ ...open, create: val })}
    >

        {
            ["create.width", "create.height", "create.channels", "create.noise.mean", "create.noise.sigma"].map(key =>
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
        <EnumParam
            name="create.noise.type"
            current={values["create.noise.type"]}
            appendParam={(param, value) => {
                appendParam(param, value, true);
                setApplied({ ...applied, "create.noise.type": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "create.noise.type": false
                });
            }}
            mayApply
            applied={applied["create.noise.type"]}
            options={[
                "gaussian",
            ]}
        />
        <ColorParam
            name="create.background"
            current={values["create.background"]}
            appendParam={(param, value) => {
                appendParam(param, value, true);
                setApplied({ ...applied, "create.background": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "create.background": false
                });
            }}
            mayApply
            applied={applied["create.background"]}
        />
    </Collapsable>
}