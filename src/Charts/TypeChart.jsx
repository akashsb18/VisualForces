import React, { useContext } from 'react';
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer, Label
} from 'recharts';
import { ContentContext } from '../Context/ContentContext';
import { Typography } from '@mui/material';
import SearchContext from '../Context/SearchContext';

const CategoryChart = () => {
    const { searchValue } = useContext(SearchContext);
    const { pageData } = useContext(ContentContext);
    const input = pageData.Type;
    console.log(input);

    if (!input || !input.solvedCategories) {
        return null;
    }

    const { solvedCategories } = input;

    const data = Object.entries(solvedCategories)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => a.category.localeCompare(b.category));

    return (
        <div>
            <Typography variant='h5' align='center'
                sx={{ fontSize: { xs: '20px', md: '30px' } }}
            >
                Level of {searchValue}
            </Typography>
            <ResponsiveContainer width="100%" height={400}>

                <ComposedChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category">
                        <Label value="Level" position="insideBottom" dy={20} />
                    </XAxis>
                    <YAxis>
                        <Label value="No. of problems" position="insideLeft" angle={-90} />
                    </YAxis>
                    <Tooltip
                        cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                        contentStyle={{
                            backgroundColor: '#f5f5f5',
                            border: 'none',
                            borderRadius: '4px',
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '14px',
                            padding: '10px',
                        }}
                        labelStyle={{
                            color: '#555555',
                            fontWeight: 'bold',
                        }}
                    />
                    <Legend verticalAlign="top" />
                    <Bar dataKey="count" fill="#8884d8" barSize={30} radius={[10, 10, 0, 0]} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryChart;
