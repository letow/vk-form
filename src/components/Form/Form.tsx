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
    FormLayoutGroup,
    DateInput,
    LocaleProvider,
} from "@vkontakte/vkui";
import "./Form.css";
import { useEffect, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const Form = () => {
    const [tower, setTower] = useState<string>("");
    const [floor, setFloor] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(() => new Date());
    const [isError, setIsError] = useState(true);
    const [text, setText] = useState<string>("");

    const minTime = dayjs().set("hour", 8).startOf("hour");
    const maxTime = dayjs().set("hour", 22).startOf("hour");

    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);

    const clearForm = () => {
        setTower("");
        setFloor("");
        setRoom("");
        setDate(undefined);
        setStartTime(null);
        setEndTime(null);
        setText("");
    };

    const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    useEffect(() => {
        if (!startTime || !endTime) return;

        startTime.isAfter(endTime, "minutes") ||
        startTime.isSame(endTime, "minutes") ||
        !tower ||
        !floor ||
        !room ||
        !date
            ? setIsError(true)
            : setIsError(false);
    }, [startTime, endTime, tower, floor, room, date]);

    return (
        <View activePanel="new-book">
            <Panel id="new-book">
                <PanelHeader>Бронирование переговорки</PanelHeader>
                <Group>
                    <FormLayout id="bookForm">
                        <FormLayoutGroup mode="horizontal">
                            <FormItem
                                top="Башня"
                                status={tower ? "valid" : "error"}
                            >
                                <Select
                                    placeholder="Выберите башню"
                                    value={tower}
                                    allowClearButton
                                    options={[
                                        {
                                            value: "A",
                                            label: "Башня А",
                                        },
                                        {
                                            value: "B",
                                            label: "Башня Б",
                                        },
                                    ]}
                                    onChange={(e) => setTower(e.currentTarget.value)}
                                />
                            </FormItem>

                            <FormItem
                                top="Этаж"
                                status={floor ? "valid" : "error"}
                            >
                                <Select
                                    placeholder="Выберите этаж"
                                    value={floor}
                                    allowClearButton
                                    options={new Array(25).fill(0).map((_, i) => {
                                        return {
                                            value: (i + 3).toString(),
                                            label: (i + 3).toString(),
                                        };
                                    })}
                                    onChange={(e) => setFloor(e.currentTarget.value)}
                                />
                            </FormItem>

                            <FormItem
                                top="Переговорка"
                                status={room ? "valid" : "error"}
                            >
                                <Select
                                    placeholder="Выберите переговорку"
                                    value={room}
                                    allowClearButton
                                    options={new Array(10).fill(0).map((_, i) => {
                                        return {
                                            value: (i + 1).toString(),
                                            label: (i + 1).toString(),
                                        };
                                    })}
                                    onChange={(e) => setRoom(e.currentTarget.value)}
                                />
                            </FormItem>
                        </FormLayoutGroup>

                        <FormLayoutGroup mode="horizontal">
                            <div className="timePickerBlock">
                                <FormItem top={"Дата бронирования"}>
                                    <LocaleProvider value={"ru"}>
                                        <DateInput
                                            value={date}
                                            disablePast
                                            disablePickers
                                            showNeighboringMonth
                                            onChange={setDate}
                                        />
                                    </LocaleProvider>
                                </FormItem>
                            </div>

                            <FormItem
                                top={"Время бронирования"}
                                className="timePickerFormItem"
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div className="timePickerBlock">
                                        <TimePicker
                                            className="timePicker"
                                            value={startTime}
                                            minTime={minTime}
                                            maxTime={maxTime}
                                            format={"HH:mm"}
                                            ampm={false}
                                            skipDisabled
                                            onChange={(e) => setStartTime(e)}
                                        />
                                        <span>—</span>
                                        <TimePicker
                                            className="timePicker"
                                            value={endTime}
                                            minTime={minTime}
                                            maxTime={maxTime}
                                            format={"HH:mm"}
                                            ampm={false}
                                            skipDisabled
                                            onChange={(e) => setEndTime(e)}
                                        />
                                    </div>
                                </LocalizationProvider>
                            </FormItem>
                        </FormLayoutGroup>

                        <FormItem top="Комментарий">
                            <Textarea
                                value={text}
                                onChange={onChangeTextarea}
                            />
                        </FormItem>

                        <FormItem>
                            <Button
                                size="l"
                                stretched
                                disabled={isError}
                            >
                                Отправить
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button
                                size="l"
                                appearance="neutral"
                                stretched
                                onClick={clearForm}
                            >
                                Очистить
                            </Button>
                        </FormItem>
                    </FormLayout>
                </Group>
            </Panel>
        </View>
    );
};
