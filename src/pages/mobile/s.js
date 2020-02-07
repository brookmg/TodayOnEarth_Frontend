import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import PostHolderCard from "../../components/UIElements/PostHolderCard"

import withQueryParsedURL from "../../components/HOCs/withQueryParsedURL"
import {
    Collapse, Card,
    CardTitle,
    CardBody,
    Button,
    FormInput,
    FormCheckbox
} from "shards-react";
import Margin from "../../components/CompoundComponents/Margin"

const AdvancedFiltersSection = (props) => {
    const handleAdvancedFilterButtonClick = () => {
        setAdvancedFiltersCollapsed(!isAdvancedFiltersCollapsed)
    }

    const handleCheckBoxChange = (event, name) => {

        const isChecked = checkedItems[name]

        setCheckedItems({ ...checkedItems, [name]: !isChecked });
    }

    const locations = ['Africa', 'Europe', 'Asia',]

    const [isAdvancedFiltersCollapsed, setAdvancedFiltersCollapsed] = React.useState(true);
    const [checkedItems, setCheckedItems] = React.useState({});

    return (
        <div>

            <Button
                onClick={handleAdvancedFilterButtonClick}>
                Advanced Filters {isAdvancedFiltersCollapsed ? `🠋` : `🠉`}
            </Button>
            <Margin vertical="1rem">

                <Collapse open={!isAdvancedFiltersCollapsed}>

                    <Card>
                        <CardBody>
                            <Margin bottom="1rem">

                                <div>
                                    <CardTitle>Location</CardTitle>
                                    <div>

                                        {
                                            locations.map(e => (
                                                <FormCheckbox
                                                    inline
                                                    key={e}
                                                    checked={!!checkedItems[e]}
                                                    onChange={ev => handleCheckBoxChange(ev, e)}
                                                >
                                                    {e}
                                                </FormCheckbox>

                                            ))
                                        }

                                    </div>

                                </div>
                            </Margin>

                            <Margin vertical="1rem">

                                <div>
                                    <CardTitle>Time Period</CardTitle>
                                    <div>

                                        Starting From: <FormInput type="date" size="sm" />
                                        Ending At: <FormInput type="date" size="sm" />

                                    </div>

                                </div>
                            </Margin>
                            <div>
                                <Margin vertical="1rem">
                                    <Button theme="success">Refine search</Button>
                                </Margin>
                            </div>
                        </CardBody>
                    </Card>

                </Collapse>
            </Margin>
        </div>

    )

}

const SearchPage = withQueryParsedURL((props) => (
    <Layout>
        <SEO title="Home" />

        <AdvancedFiltersSection />

        <h2>Search results for: "{props.queryParsedURL.search_term}"</h2>
        <PostHolderCard />


        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
))

export default SearchPage
