import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Card, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Title, Text} from "@tremor/react";
import React from "react";
import {Head} from "@inertiajs/react";

export default function Dashboard(){
    return <>
        <AdminLayout>
            <Head>
                <title>Bảng điều khiển</title>
            </Head>
            <div className={"p-5"}>
                <Title>Bảng điều khiển</Title>
                <TabGroup className="mt-4">
                    <TabList>
                        <Tab>Báo hỏng</Tab>
                        <Tab>Đánh giá</Tab>
                        <Tab>Lượt truy cập</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                                <Card>
                                    {/* Placeholder to set height */}
                                    <div className="h-28" />
                                </Card>
                                <Card>
                                    {/* Placeholder to set height */}
                                    <div className="h-28" />
                                </Card>
                                <Card>
                                    {/* Placeholder to set height */}
                                    <div className="h-28" />
                                </Card>
                            </Grid>
                            <div className="mt-6">
                                <Card>
                                    <div className="h-80" />
                                </Card>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-6">
                                <Card>
                                    <div className="h-96" />
                                </Card>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-6">
                                <Card>
                                    <div className="h-96" />
                                </Card>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>

        </AdminLayout>
    </>
}
