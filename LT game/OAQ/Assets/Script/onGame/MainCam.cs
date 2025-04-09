using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System.Threading;
using UnityEngine.UI;

public class Stone
{
    private int type; // 0: Villager, 1: Official
    private int num;
    public Stone(int type = 0, int num = 0)
    {
        this.type = type;
        this.num = num;
    }

    public int getType()
    {
        return type;
    }
    public int getNum() {
        return num;

    }
    public void setNum(int add)
    {
        this.num = this.num + add;
    }
}

public class TileStone
{
    private List<Stone> v;
    public TileStone()
    {
        v = new List<Stone>();
    }

    public void addStone(int type, int num)
    {
        for (int i = 0; i < v.Count; i++)
        {
            if (v[i].getType() == type)
            {
                v[i].setNum(num);
                return;
            }
        }
        v.Add(new Stone(type, num));
    }

    public List<Stone> getLst() {
        return v;
    }

    public int sumOfVil()
    {
        for (int i = 0; i < v.Count; i++)
        {
            if (v[i].getType() == 0)
            {
                return v[i].getNum();
            }
        }
        return 0;
    }

    public void Clear()
    {
        v.Clear();
    }

    public int totalStone()
    {
        int total = 0;
        for (int i = 0; i < v.Count; i++)
        {
            if (v[i].getType() == 0)
                total += v[i].getNum();
            else
                total += v[i].getNum() * 5;
        }
        return total;
    }

    public void updateVil(int num)
    {
        for (int i = 0; i < v.Count; i++)
        {
            if (v[i].getType() == 0)
            {
                v[i].setNum(num);
                return;
            }
        }
    }
}

public class MainCam : MonoBehaviour
{
    private int num;
    [SerializeField] private GameObject Tile_;
    [SerializeField] private GameObject NTile_;
    [SerializeField] private GameObject Stone_;
    [SerializeField] private Sprite VilSprite;
    [SerializeField] private Sprite OffSprite;
    [SerializeField] private GameObject Vil;
    [SerializeField] private GameObject Off;
    private Button inputField;
    private Button R;
    private Button L;
    private int pickID;
    private int nb_stone_pick;
    private int score1;
    private int score2;

    private TileStone[] board = new TileStone[12];
    private List<GameObject> GOblst;
    private List<GameObject> stones = new List<GameObject>();

    private void Awake()
    {
        GameObject makePlayer = GameObject.FindGameObjectWithTag("numPlayer") as GameObject;
        L = GameObject.Find("Canvas/L").GetComponent<Button>();
        R = GameObject.Find("Canvas/R").GetComponent<Button>();
        inputField = GameObject.Find("Canvas/nb").GetComponent<Button>();
        num = makePlayer.GetComponent<NumPlayer>().num;
        Destroy(makePlayer);
        Debug.Log(num);
    }

    private void Start()
    {
        pickID = -1;
        score1 = 0; score2 = 0;
        GOblst = new List<GameObject>();
        L.onClick.RemoveAllListeners(); // Xoá sự kiện cũ (nếu có)
        R.onClick.RemoveAllListeners();
        L.onClick.AddListener(() => StoneMove("L"));
        R.onClick.AddListener(() => StoneMove("R"));
        GameBoard();
        InitBoard();
        renderStone();
    }

    private void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            RaycastHit2D hit = Physics2D.Raycast(mousePos, Vector2.zero);

            if (hit.collider != null)
            {
                GameObject clicked = hit.collider.gameObject;

                // Kiểm tra nếu nó là 1 trong các Tile
                if (GOblst.Contains(clicked))
                {
                    pickID = GOblst.IndexOf(clicked);
                    //Debug.Log($"Tile {pickID} được click!\n");
                    nb_stone_pick = board[pickID].sumOfVil();
                    //Debug.Log($"{nb_stone_pick} of vils are picked!");
                    inputField.GetComponentInChildren<TMP_Text>().text = nb_stone_pick.ToString();
                }
            }
        }
    }

    private int nextPickID(int pickID, string dir)
    {
        if (dir == "L")
        {
            if (pickID == 0) return 5;
            else if (pickID <= 4) return pickID - 1;
            else if (pickID == 11) return 4;
            else return pickID + 1;
        }
        else if (dir == "R")
        {
            if (pickID == 4) return 11;
            else if (pickID <= 4) return pickID + 1;
            else if (pickID == 5) return 0;
            else return pickID - 1;
        }
        return -1; // Trả về -1 nếu không tìm thấy
    }

    private void StoneMove(string dir)
    {
        if ((pickID >= 0 && pickID < 5) || (pickID > 5 && pickID < 11))
        {
            board[pickID].updateVil(-nb_stone_pick);
            while (nb_stone_pick > 0)
            {
                pickID = nextPickID(pickID, dir);
                board[pickID].updateVil(1);
                nb_stone_pick--;
                if (nb_stone_pick == 0)
                {
                    if (board[nextPickID(pickID, dir)].sumOfVil() > 0)
                    {
                        pickID = nextPickID(pickID, dir);
                        nb_stone_pick = board[pickID].sumOfVil();
                    }
                    else if (nextPickID(pickID, dir) != 5 && nextPickID(pickID, dir) != 11 
                        && board[nextPickID(pickID, dir)].sumOfVil() == 0 
                        && board[nextPickID(nextPickID(pickID,dir),dir)].totalStone() > 0)
                    {
                        score1 += board[nextPickID(nextPickID(pickID, dir),dir)].totalStone();
                        board[nextPickID(nextPickID(pickID, dir),dir)].Clear();
                        pickID = -1;
                        Debug.Log($"Player 1: {score1}");
                    }
                }
                Thread.Sleep(200);
                renderStone();
            }
            pickID = -1;
        }
        pickID = -1;
        return;
    }

    public GameObject getTile(int i)
    {
        return GOblst[i];
    }

    private void printBoard()
    {
        string output = "[ ";
        for (int i = 0; i < 12; i++)
        {
            if (i == 5 ||i == 11)
            {
                output = output + "(Vil: " + board[i].sumOfVil() + ", Off: " + ((board[i].totalStone() - board[i].sumOfVil())/5) + $", Total: {board[i].totalStone()}) | ";
            }
            else
                output = output + board[i].sumOfVil().ToString() + " | ";
        }
        Debug.Log(output + "]");
    }
    private void GameBoard()
    {
        int ID = 0;
        float x = -4.91f;
        float y1 = 0.26f;
        float gap = 2.47f;
        float y2 = -2.19f;

        for (int i = 0; i < 12; i++)
        {
            if (i <= 4)
            {
                GameObject obj = Instantiate(Tile_, new Vector2(x + gap * i, y1), Quaternion.identity);
                obj.name = ID.ToString();
                SpriteRenderer sr = obj.GetComponent<SpriteRenderer>();
                if (sr == null)
                {
                    sr = obj.AddComponent<SpriteRenderer>(); // Thêm SpriteRenderer nếu chưa có
                }

                // Đặt thứ tự hiển thị
                sr.sortingOrder = 2;
                GOblst.Add(obj);
            }
            else if (i == 5)
            {
                GameObject obj = Instantiate(NTile_, new Vector2(-7.18f, -0.92f), Quaternion.identity);
                obj.name = ID.ToString();
                SpriteRenderer sr = obj.GetComponent<SpriteRenderer>();
                if (sr == null)
                {
                    sr = obj.AddComponent<SpriteRenderer>(); // Thêm SpriteRenderer nếu chưa có
                }

                // Đặt thứ tự hiển thị
                sr.sortingOrder = 2;
                GOblst.Add(obj);
            }
            else if (i <= 10)
            {
                GameObject obj = Instantiate(Tile_, new Vector2(x + (i - 6) * gap, y2), Quaternion.identity);
                obj.name = ID.ToString();
                SpriteRenderer sr = obj.GetComponent<SpriteRenderer>();
                if (sr == null)
                {
                    sr = obj.AddComponent<SpriteRenderer>(); // Thêm SpriteRenderer nếu chưa có
                }

                // Đặt thứ tự hiển thị
                sr.sortingOrder = 2;
                GOblst.Add(obj);
            }
            else if (i == 11)
            {
                GameObject obj = Instantiate(NTile_, new Vector2(7.22f, -0.92f), Quaternion.identity);
                obj.name = ID.ToString();
                SpriteRenderer sr = obj.GetComponent<SpriteRenderer>();
                if (sr == null)
                {
                    sr = obj.AddComponent<SpriteRenderer>(); // Thêm SpriteRenderer nếu chưa có
                }

                // Đặt thứ tự hiển thị
                sr.sortingOrder = 2;
                GOblst.Add(obj);
            }
            ID++;
        }
    }

    private void InitBoard()
    {
        for (int i = 0; i < 12; i++)
        {
            if (i == 5 || i == 11)
            {
                board[i] = new TileStone();
                board[i].addStone(1, 1);
                board[i].addStone(0, 0);
            }
            else
            {
                board[i] = new TileStone();
                board[i].addStone(0, 5);
            }
        }
    }

    private void renderStone()
    {
        // 1. Xoá stone cũ
        foreach (GameObject s in stones)
            Destroy(s);
        stones.Clear();
        printBoard();
        // 2. Render lại từ board
        for (int i = 0; i < 12; i++)
        {
            List<Stone> lst = board[i].getLst();
            Vector2 pos = GOblst[i].transform.position;
            float w = GOblst[i].GetComponent<SpriteRenderer>().bounds.size.x;
            float h = GOblst[i].GetComponent<SpriteRenderer>().bounds.size.y;

            for (int j = 0; j < lst.Count; j++)
            {
                for (int k = 0; k < lst[j].getNum(); k++)
                {
                    float randomX = pos.x - w / 2 + w / 6 + (k % 6) * w / 6;
                    float randomY = pos.y + h / 2 - h / 6 + (k / 6) * h / 6;

                    GameObject st = null;
                    if (lst[j].getType() == 0)
                        st = Instantiate(Vil, new Vector2(randomX, randomY), Quaternion.identity);
                    else
                        st = Instantiate(Off, new Vector2(pos.x, pos.y), Quaternion.identity);

                    st.name = $"stone_{i}_{j}_{k}";
                    stones.Add(st);
                }
            }
        }
    }
}
