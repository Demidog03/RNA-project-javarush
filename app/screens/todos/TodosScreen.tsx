import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {addTodo, changeFilter, deleteTodo, TodoFilter, toggleTodo} from "@/app/store/slices/todoSlice";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function TodosScreen() {
    const [inputText, setInputText] = useState<string>('');
    const {items, filter} = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch();
    
    const filteredTodos = useMemo(() => {
        return items.filter(todo => {
            if (filter === 'active') {
                return !todo.completed
            }
            if (filter === 'completed') {
                return todo.completed
            }
            return true
        })
    }, [filter, items]);

    function handleAddTodo() {
        const trimmedInputText = inputText.trim();

        if (trimmedInputText) {
            dispatch(addTodo(inputText));
            setInputText('');
        }
    }

    function handleChangeFilter(filter: TodoFilter) {
        dispatch(changeFilter(filter));
    }

    function handleToggleTodo(id: string) {
        dispatch(toggleTodo(id));
    }

    function handleDeleteTodo(id: string) {
        dispatch(deleteTodo(id));
    }

    console.log(items, filter)

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <Text style={styles.title}>My Todos</Text>
                <View style={styles.stats}>
                    <Text style={styles.statsText}>Active: 0 | Completed: 2</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="What needs to be done?"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddTodo}
                >
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                    onPress={() => handleChangeFilter('all')}
                >
                    <Text
                        style={[styles.filterText, filter === 'all' && styles.activeFilterText]}
                    >All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'active' && styles.activeFilter]}
                    onPress={() => handleChangeFilter('active')}
                >
                    <Text
                        style={[styles.filterText, filter === 'active' && styles.activeFilterText]}
                    >Active</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
                    onPress={() => handleChangeFilter('completed')}
                >
                    <Text
                        style={[styles.filterText, filter === 'completed' && styles.activeFilterText]}
                    >Completed</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredTodos}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <TouchableOpacity
                            style={styles.todoContent}
                            onPress={() => handleToggleTodo(item.id)}
                        >
                            <View>
                                {item.completed && <Text>✔️</Text>}
                            </View>
                            <Text style={styles.todoText}>{item.text}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteTodo(item.id)}
                        >
                            <Text style={styles.deleteButtonText}>
                                <MaterialIcons name="delete" size={20} color="white" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <View>
                        <Text>
                            {filter === 'active' && 'No active todos'}
                            {filter === 'completed' && 'No completed todos'}
                            {filter === 'all' && 'No todos yet. Add one above!'}
                        </Text>
                    </View>
                }
           />
        </KeyboardAvoidingView>
    );
}

export default TodosScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        backgroundColor: '#6200ee',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },
    stats: {
        marginTop: 4,
    },
    statsText: {
        fontSize: 14,
        color: '#e1bee7'
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    addButton: {
        marginLeft: 12,
        backgroundColor: '#6200ee',
        borderRadius: 8,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    filterContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    filterButton: {
        flex: 1,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 6,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    activeFilter: {
        backgroundColor: '#6200ee',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    activeFilterText: {
        color: 'white',
    },
    listContainer: {
        padding: 16
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    todoContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    todoText: {
        flex: 1,
        fontSize: 16,
        color: '#333'
    },
    deleteButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ff5252',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12
    },
    deleteButtonText: {
        color: 'white',
    }
})