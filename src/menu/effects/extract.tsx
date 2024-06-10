import { Collapsable, NumericParam, SectionProps } from "..";

export function Extract({ open, applied, appendParam, removeParam, setApplied, setOpen, after, values }: SectionProps & { after?: boolean }) {

    const key = after ? "extractAfter" : "extract";

    return <Collapsable
        section={after ? "ExtractAfter" : "Extract"}
        open={after ? open.extractAfter : open.extract}
        setOpen={(val) => after ? setOpen({ ...open, extractAfter: val }) : setOpen({ ...open, extract: val })}
    >
        {[`${key}.top`, `${key}.left`, `${key}.width`, `${key}.height`].map(
            (key) => (
                <NumericParam
                    name={key}
                    current={values[key]}
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
                    required
                    applied={applied[key]}
                />
            )
        )}
    </Collapsable>
}