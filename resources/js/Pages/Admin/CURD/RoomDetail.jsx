import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Card, Flex, Grid, Metric, Tab, TabGroup, TabList, TabPanel, TabPanels, Title, Text} from "@tremor/react";
import React from "react";

export default function (){
    return <>
        <AdminLayout>
            <Flex justifyContent={"between"} className={"mb-4"}>
                <Title>Chi tiết phòng A.1234</Title>
            </Flex>
            <TabGroup className="mt-4">
                <TabList>
                    <Tab>Thông tin</Tab>
                    <Tab>Báo hỏng</Tab>
                    <Tab>Đánh giá</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
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
        </AdminLayout>
    </>
}
