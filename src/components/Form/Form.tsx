import "./Form.css";
import {
    Button,
    Select,
    View,
    Panel,
    PanelHeader,
    Group,
    FormLayout,
    FormItem,
    Textarea,
} from "@vkontakte/vkui";

export const Form = () => {
    return (
        <View activePanel="new-user">
            <Panel id="new-user">
                <PanelHeader>Бронирование переговорки</PanelHeader>
                <Group>
                    <FormLayout>
                        <FormItem top="Башня">
                            <Select
                                placeholder="Выберите башню"
                                options={[
                                    {
                                        value: "0",
                                        label: "Башня А",
                                    },
                                    {
                                        value: "1",
                                        label: "Башня Б",
                                    },
                                ]}
                            />
                        </FormItem>

                        <FormItem top="Этаж">
                            <Select
                                placeholder="Выберите этаж"
                                options={new Array(25)
                                    .fill(0)
                                    .map((_, i) => {
                                        return {
                                            value: (i + 3).toString(),
                                            label: (i + 3).toString(),
                                        };
                                    })}
                            />
                        </FormItem>

                        <FormItem top="Переговорка">
                            <Select
                                placeholder="Выберите переговорку"
                                options={new Array(10)
                                    .fill(0)
                                    .map((_, i) => {
                                        return {
                                            value: (i + 1).toString(),
                                            label: (i + 1).toString(),
                                        };
                                    })}
                            />
                        </FormItem>

                        <FormItem top="Комментарий">
                            <Textarea />
                        </FormItem>

                        <FormItem>
                            <Button
                                size="l"
                                stretched
                            >
                                Забронировать
                            </Button>
                        </FormItem>
                    </FormLayout>
                </Group>
            </Panel>
        </View>
    );
};
