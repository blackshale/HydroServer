#Boa:Dialog:frmAddPoint

import wx
import wx.lib.buttons
import wx.grid
import wx.lib.mixins.gridlabelrenderer as glr
from wx.lib.pubsub import Publisher

def create(parent):
    return frmAddPoint(parent)

[wxID_FRMADDPOINT, wxID_FRMADDPOINTBTNCANCEL, wxID_FRMADDPOINTBTNSAVE, 
 wxID_FRMADDPOINTGRDDATAVALUES, wxID_FRMADDPOINTPNLMAIN, 
] = [wx.NewId() for _init_ctrls in range(5)]

class frmAddPoint(wx.Dialog):
    def _init_coll_boxSizer1_Items(self, parent):
        # generated method, don't edit

        parent.AddWindow(self.grdDataValues, 90, border=0, flag=wx.EXPAND)
        parent.AddSizer(self.boxSizer2, 10, border=0, flag=wx.EXPAND)

    def _init_coll_boxSizer2_Items(self, parent):
        # generated method, don't edit

        parent.AddWindow(self.pnlMain, 70, border=0, flag=0)
        parent.AddWindow(self.btnSave, 15, border=0, flag=0)
        parent.AddWindow(self.btnCancel, 15, border=0, flag=0)

    def _init_sizers(self):
        # generated method, don't edit
        self.boxSizer1 = wx.BoxSizer(orient=wx.VERTICAL)

        self.boxSizer2 = wx.BoxSizer(orient=wx.HORIZONTAL)

        self._init_coll_boxSizer1_Items(self.boxSizer1)
        self._init_coll_boxSizer2_Items(self.boxSizer2)

        self.SetSizer(self.boxSizer1)

    def _init_ctrls(self, prnt):
        # generated method, don't edit
        wx.Dialog.__init__(self, id=wxID_FRMADDPOINT, name=u'frmAddPoint',
              parent=prnt, pos=wx.Point(573, 334), size=wx.Size(661, 277),
              style=wx.DEFAULT_DIALOG_STYLE, title=u'Add Point(s)')
        self.SetClientSize(wx.Size(645, 239))
        self.SetToolTipString(u'Dialog1')

        self.grdDataValues = MyGrid(id=wxID_FRMADDPOINTGRDDATAVALUES,
              name=u'grdDataValues', parent=self, pos=wx.Point(0, 0),
              size=wx.Size(645, 215), style=0)



        self.grdDataValues.SetLabel(u'grdDataValue')
        self.grdDataValues.SetToolTipString(u'Add Value')

        self.grdDataValues.SetRowLabelSize(20)
        self.grdDataValues.Bind(wx.grid.EVT_GRID_SELECT_CELL,
              self.OnGrdDataValuesGridSelectCell)

        self.grdDataValues.GetGridWindow().Bind(wx.EVT_MOTION, self.onMouseOver)
        # put a tooltip on a column label
        self.grdDataValues.GetGridColLabelWindow().Bind(wx.EVT_MOTION, 
                                               self.onMouseOverColLabel)
        

        self.pnlMain = wx.Panel(id=wxID_FRMADDPOINTPNLMAIN, name=u'pnlMain',
              parent=self, pos=wx.Point(0, 215), size=wx.Size(451, 29),
              style=wx.TAB_TRAVERSAL)

        self.btnSave = wx.Button(id=wxID_FRMADDPOINTBTNSAVE, label=u'Save',
              name=u'btnSave', parent=self, pos=wx.Point(451, 215),
              size=wx.Size(97, 23), style=0)
        self.btnSave.Bind(wx.EVT_BUTTON, self.OnBtnSaveButton,
              id=wxID_FRMADDPOINTBTNSAVE)

        self.btnCancel = wx.Button(id=wxID_FRMADDPOINTBTNCANCEL,
              label=u'Cancel', name=u'btnCancel', parent=self, pos=wx.Point(548,
              215), size=wx.Size(97, 23), style=0)
        self.btnCancel.Bind(wx.EVT_BUTTON, self.OnBtnCancelButton,
              id=wxID_FRMADDPOINTBTNCANCEL)

        self._init_sizers()

    def _init_table(self, series=None):


      self.grdDataValues.CreateGrid(1,15)
      # self.Service = Publisher().sendMessage(("GetDBService"), None)
      DBConn=self.parent.parent.GetDBService()
      # print DBConn
      self.service = DBConn.get_cv_service()


      ccchoices= list(x.term for x in self.service.get_censor_code_cvs())
      self.cc_choice_editor = wx.grid.GridCellChoiceEditor(["None"]+ccchoices, False)
      self.grdDataValues.SetCellEditor(0, 9, self.cc_choice_editor)

      otchoices = list(x.description for x in self.service.get_offset_type_cvs()) 
      self.ot_choice_editor= wx.grid.GridCellChoiceEditor(["None"]+otchoices, False)
      self.grdDataValues.SetCellEditor(0, 8, self.ot_choice_editor)

      # qualchoices

      sampchoices =list(x.term for x in self.service.get_sample_type_cvs())
      self.samp_choice_editor= wx.grid.GridCellChoiceEditor(["None"]+sampchoices, False)
      self.grdDataValues.SetCellEditor(0, 13, self.samp_choice_editor)

      self.grdDataValues.Font.Weight = wx.LIGHT
      
      
      #HydroDesktop :
        # DataValue, req
        # ValueAccuracy, 
        # LocalDateTime, req
        # UTCOffset, req
        # DateTimeUTC, req
        # OffsetValue,
        # CensorCode, dd
        # OffsetType, dd
        # Qualifier, dd
        # Sample  dd


      # color = self.grdDataValues.GetLabelBackgroundColour()
      color= "Yellow"
      self.grdDataValues.SetColLabelValue(0, "DataValue")#Bold
      self.grdDataValues.SetColLabelRenderer(0, MyColLabelRenderer(color))
      self.grdDataValues.SetColLabelValue(1, "ValueAccuracy")
      self.grdDataValues.SetColLabelValue(2, "LocalDateTime")#Bold
      self.grdDataValues.SetColLabelRenderer(2, MyColLabelRenderer(color))
      self.grdDataValues.SetColLabelValue(3, "UTCOffset")#Bold
      self.grdDataValues.SetColLabelRenderer(3, MyColLabelRenderer(color))
      self.grdDataValues.SetColLabelValue(4, "DateTimeUTC")#Bold
      self.grdDataValues.SetColLabelRenderer(4, MyColLabelRenderer(color))
      self.grdDataValues.SetColLabelValue(5, "SiteID")#Bold#prefill
      self.grdDataValues.SetColLabelRenderer(5, MyColLabelRenderer(color))
      self.grdDataValues.SetColLabelValue(6, "VariableID")#Bold#prefill
      self.grdDataValues.SetColLabelRenderer(6, MyColLabelRenderer(color))
      self.grdDataValues.SetColLabelValue(7, "OffsetValue")
      self.grdDataValues.SetColLabelValue(8, "OffsetType")#DropDown
      self.grdDataValues.SetColLabelValue(9, "CensorCode")#Bold
      self.grdDataValues.SetColLabelRenderer(9, MyColLabelRenderer(color))
      self.grdDataValues.SetColLabelValue(10, "QualifierID")#DropDown
      self.grdDataValues.SetColLabelValue(11, "MethodID")#Bold#prefill
      self.grdDataValues.SetColLabelRenderer(11, MyColLabelRenderer(color))
      self.grdDataValues.SetColLabelValue(12, "SourceID")#Bold #prefill
      self.grdDataValues.SetColLabelRenderer(12, MyColLabelRenderer(color))
      self.grdDataValues.SetColLabelValue(13, "SampleID")
      self.grdDataValues.SetColLabelValue(14, "QualityControlLevelID")#Bold#prefill
      self.grdDataValues.SetColLabelRenderer(14, MyColLabelRenderer(color))

      self.grdDataValues.AutoSizeColumns()

      # self.grdDataValues.AppendCols(numCols = 1, updateLabels = True)
      # count = self.grdSummary.GetNumberCols()
      # self.grdDataValues.SetColLabelValue(count-1, series.site_name +"-"+ series.variable_name)

      pass

    def __init__(self, parent):
        self.parent = parent
        self._init_ctrls(parent)
        self._init_table()

    def onMouseOver(self, event):
        
        # Use CalcUnscrolledPosition() to get the mouse position within the 
        # entire grid including what's offscreen
        # This method was suggested by none other than Robin Dunn
        x, y = self.grdDataValues.CalcUnscrolledPosition(event.GetX(),event.GetY())
        coords = self.grdDataValues.XYToCell(x, y)
        col = coords[1]
        row = coords[0]
 
        # Note: This only sets the tooltip for the cells in the column
        if col == 1:
            msg = "This is Row %s, Column %s!" % (row, col)
            event.GetEventObject().SetToolTipString(msg)
        else:
            event.GetEventObject().SetToolTipString('')
        event.Skip()
 
    #----------------------------------------------------------------------
    def onMouseOverColLabel(self, event):
        ##Displays a tooltip when mousing over certain column labels

        x = event.GetX()
        y = event.GetY()
        ##not accurate becasue of scrolling
        col = self.grdDataValues.XToCol(x, y)
        tip =""

        if col == 0 or col == 1 or col ==3 or col ==7 :
            tip= "Decimal"
        elif col == 2 or col == 4:
            tip = "M/d/yyyy h:mm:ss tt"
        elif col == 5 or col == 6 or col == 11 or col == 12 or col == 14:
            tip = "Can't change"
        elif col == 8 or col == 9 or col == 10 or col == 13:
            tip = "Controlled Vocabulary"        
        else:
            tip = "None"
        self.grdDataValues.GetGridColLabelWindow().SetToolTipString(tip)
        event.Skip()

    def OnBtnSaveButton(self, event):
        event.Skip()

    def OnBtnCancelButton(self, event):
        event.Skip()

    def OnGrdDataValuesGridSelectCell(self, event):
        
        # print "sel Cell"#, dir(event)
        # print event.Col, event.Row
        # print self.grdDataValues.GetNumberRows()


        #if last row AND and all req cells from previous row are filled out
        if event.Row == self.grdDataValues.GetNumberRows()-1:
          self.grdDataValues.AppendRows(numRows= 1) 
          ##format all of the cells with drop down boxes and fill in 5 identifiers       
          self.grdDataValues.SetCellEditor(self.grdDataValues.GetNumberRows()-1, 9, self.cc_choice_editor)
          self.grdDataValues.SetCellEditor(self.grdDataValues.GetNumberRows()-1, 8, self.ot_choice_editor)
          self.grdDataValues.SetCellEditor(self.grdDataValues.GetNumberRows()-1, 13, self.samp_choice_editor)

        
        event.Skip()


class MyColLabelRenderer(glr.GridLabelRenderer):
    def __init__(self, bgcolor):
        self._bgcolor = bgcolor
        
    def Draw(self, grid, dc, rect, col):
        dc.SetBrush(wx.Brush(self._bgcolor))
        dc.SetPen(wx.TRANSPARENT_PEN)
        dc.DrawRectangleRect(rect)
        hAlign, vAlign = grid.GetColLabelAlignment()
        text = grid.GetColLabelValue(col)
        self.DrawBorder(grid, dc, rect)
        dc.Font.Weight = wx.BOLD
        # dc.Font.PointSize = 18
        self.DrawText(grid, dc, rect, text, hAlign, vAlign)

class MyGrid(wx.grid.Grid, glr.GridWithLabelRenderersMixin):
    def __init__(self, *args, **kw):
        wx.grid.Grid.__init__(self, *args, **kw)
        glr.GridWithLabelRenderersMixin.__init__(self)


