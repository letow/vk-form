import {
    Button,
    Select,
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
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { OptionType } from "../../types/OptionType";
import { useMediaQuery } from "@mui/material";

export const Form = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    const towerOptions: OptionType[] = [
        {
            value: "A",
            label: "Башня А",
        },
        {
            value: "B",
            label: "Башня Б",
        },
    ];

    const roomOptions: OptionType[] = new Array(10).fill(0).map((_, i) => {
        return {
            value: (i + 1).toString(),
            label: (i + 1).toString(),
        };
    });

    const floorOptions: OptionType[] = new Array(25).fill(0).map((_, i) => {
        return {
            value: (i + 3).toString(),
            label: (i + 3).toString(),
        };
    });

    const [tower, setTower] = useState<string>("");
    const [floor, setFloor] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(() => new Date());
    const [text, setText] = useState<string>("");
    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

    // assume that conference rooms available from 9 to 21 (while VK office is open)
    const minTime = dayjs().set("hour", 9).startOf("hour");
    const maxTime = dayjs().set("hour", 21).startOf("hour");

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

    const sendInfo = () => {
        console.log(
            JSON.stringify({
                tower,
                floor,
                room,
                date: new Intl.DateTimeFormat("ru").format(date),
                startTime: startTime?.format("HH:mm"),
                endTime: endTime?.format("HH:mm"),
                text,
            })
        );
    };

    const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const isAllFieldsFilled = useCallback((): boolean => {
        if (!startTime || !endTime) return false; // if any of timepickers is empty

        // check if all fields are not empty
        return Boolean(
            !startTime.isAfter(endTime, "minutes") &&
                !startTime.isSame(endTime, "minutes") &&
                tower &&
                floor &&
                room &&
                date
        );
    }, [tower, floor, room, date, startTime, endTime]);

    useEffect(() => {
        setIsFormFilled(isAllFieldsFilled());
    }, [isAllFieldsFilled]);

    return (
        <Panel id="new-book">
            <PanelHeader>Бронирование переговорной</PanelHeader>
            <Group className="group">
                <FormLayout id="bookForm">
                    <FormLayoutGroup mode={isMobile ? "vertical" : "horizontal"}>
                        <FormItem
                            top="Башня"
                            status={tower ? "valid" : "error"}
                        >
                            <Select
                                placeholder="Выберите башню"
                                value={tower}
                                allowClearButton
                                options={towerOptions}
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
                                options={floorOptions}
                                onChange={(e) => setFloor(e.currentTarget.value)}
                            />
                        </FormItem>

                        <FormItem
                            top="Переговорная"
                            status={room ? "valid" : "error"}
                        >
                            <Select
                                placeholder="Выберите переговорную"
                                value={room}
                                allowClearButton
                                options={roomOptions}
                                onChange={(e) => setRoom(e.currentTarget.value)}
                            />
                        </FormItem>
                    </FormLayoutGroup>

                    <FormLayoutGroup mode={isMobile ? "vertical" : "horizontal"}>
                        <div className="datePickerBlock">
                            <FormItem top={"Дата бронирования"}>
                                <LocaleProvider value={"ru"}>
                                    <DateInput
                                        value={date}
                                        status={date ? "valid" : "error"}
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
                            disabled={!isFormFilled}
                            onClick={sendInfo}
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
    );
};
