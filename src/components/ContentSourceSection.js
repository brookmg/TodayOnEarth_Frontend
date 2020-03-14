import React from "react";
import { CardBody, FormCheckbox } from "shards-react";
import Margin from "./CompoundComponents/Margin";
import ThemedCard from "./UIElements/ThemedCard";
import ThemedCardTitle from "./UIElements/ThemedCardTitle";
const ContentSourceSection = (props) => {
    const handleCheckBoxChange = (event, name) => {
        const isChecked = checkedItems[name];
        setCheckedItems({ ...checkedItems, [name]: !isChecked });
    };
    const allContentSources = ['BillGates@facebook', 'meme@telegram'];
    const [checkedItems, setCheckedItems] = React.useState({});
    return (<div>
        <Margin vertical="1rem">
            <ThemedCard>
                <CardBody>
                    <Margin bottom="1rem">

                        <div>
                            <ThemedCardTitle>Content sources</ThemedCardTitle>
                            <div>

                                {allContentSources.map(e => (<FormCheckbox inline key={e} checked={!!checkedItems[e]} onChange={ev => handleCheckBoxChange(ev, e)}>
                                    {e}
                                </FormCheckbox>))}

                            </div>

                        </div>
                    </Margin>
                </CardBody>
            </ThemedCard>

        </Margin>
    </div>);
};

export default ContentSourceSection