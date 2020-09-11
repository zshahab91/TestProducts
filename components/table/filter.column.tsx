import {Button, Input, Space,} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {ColumnType} from "antd/lib/table";
import Highlighter from 'react-highlight-words';


export default function FilterColumn<Entity extends object>(index: string): ColumnType<Entity> {

    return {

        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        // this.searchInput = node;
                    }}
                    placeholder={`Search ${index}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => this.handleSearch(selectedKeys, confirm, index)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => this.handleSearch(selectedKeys, confirm, index)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => this.handleReset(clearFilters)}
                        size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }}/>,
        // onFilter: (value, record) =>
        //     record[index] ? record[index].toString().toLowerCase().includes(value.toString().toLowerCase()) : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                // setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            // this.state.searchedColumn === index ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[
                        // this.state.searchText
                    ]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            // ) : (
            //     text
            // ),
    };
}
